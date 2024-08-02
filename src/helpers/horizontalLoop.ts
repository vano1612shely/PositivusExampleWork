import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { toArray, snap as gsapSnap, wrap } from "gsap/gsap-core";

gsap.registerPlugin(Draggable);

function horizontalLoop(items, config) {
  items = toArray(items);
  config = config || {};

  // Check if items array is empty or contains undefined elements
  if (!items.length || items.some((item) => item === undefined)) {
    console.error("No valid items provided or some items are undefined");
    return;
  }

  let onChange = config.onChange,
    lastIndex = 0,
    tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function () {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft, // This is where the error occurs
    times = [],
    widths = [],
    spaceBefore = [],
    xPercents = [],
    curIndex = 0,
    indexIsDirty = false,
    center = config.center,
    pixelsPerSecond = (config.speed || 1) * 100,
    snapFunction =
      config.snap === false ? (v) => v : gsapSnap(config.snap || 1),
    timeOffset = 0,
    container =
      center === true
        ? items[0].parentNode
        : toArray(center)[0] || items[0].parentNode,
    totalWidth,
    getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0),
    populateWidths = () => {
      let b1 = container.getBoundingClientRect(),
        b2;
      items.forEach((el, i) => {
        widths[i] = parseFloat(<string>gsap.getProperty(el, "width", "px"));
        xPercents[i] = snapFunction(
          (parseFloat(<string>gsap.getProperty(el, "x", "px")) / widths[i]) *
            100 +
            gsap.getProperty(el, "xPercent"),
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, {
        xPercent: (i) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    },
    timeWrap,
    populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      center &&
        times.forEach((t, i) => {
          times[i] = timeWrap(
            tl.labels["label" + i] +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset,
          );
        });
    },
    getClosest = (values, value, wrap) => {
      let i = values.length,
        closest = 1e10,
        index = 0,
        d;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) {
          d = wrap - d;
        }
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    },
    populateTimeline = () => {
      let i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snapFunction(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0,
        )
          .fromTo(
            item,
            {
              xPercent: snapFunction(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond,
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = wrap(0, tl.duration());
    },
    refresh = (deep) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      deep && populateTimeline();
      populateOffsets();
      deep && tl.draggable
        ? tl.time(times[curIndex], true)
        : tl.progress(progress, true);
    },
    proxy;
  gsap.set(items, { x: 0 });
  populateWidths();
  populateTimeline();
  populateOffsets();
  window.addEventListener("resize", () => refresh(true));
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex && index !== curIndex) {
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    vars.overwrite = true;
    gsap.killTweensOf(proxy);
    return vars.duration === 0
      ? tl.time(timeWrap(time))
      : tl.tweenTo(time, vars);
  }
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.closestIndex = (setCurrent) => {
    let index = getClosest(times, tl.time(), tl.duration());
    if (setCurrent) {
      curIndex = index;
      indexIsDirty = false;
    }
    return index;
  };
  tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
  tl.next = (vars) => toIndex(tl.current() + 1, vars);
  tl.previous = (vars) => toIndex(tl.current() - 1, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  if (config.draggable && typeof Draggable === "function") {
    proxy = document.createElement("div");
    let wrapFunction = wrap(0, 1),
      ratio,
      startProgress,
      draggable,
      dragSnap,
      lastSnap,
      initChangeX,
      align = () =>
        tl.progress(
          wrapFunction(
            startProgress + (draggable.startX - draggable.x) * ratio,
          ),
        ),
      syncIndex = () => tl.closestIndex(true);
    typeof InertiaPlugin === "undefined" &&
      console.warn(
        "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club",
      );
    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode,
      type: "x",
      onPressInit() {
        let x = this.x;
        gsap.killTweensOf(tl);
        startProgress = tl.progress();
        refresh();
        ratio = 1 / totalWidth;
        initChangeX = startProgress / -ratio - x;
        gsap.set(proxy, { x: startProgress / -ratio });
      },
      onDrag: align,
      onThrowUpdate: align,
      overshootTolerance: 0,
      inertia: true,
      snap(value) {
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX;
        }
        let time = -(value * ratio) * tl.duration(),
          wrappedTime = timeWrap(time),
          snapTime = times[getClosest(times, wrappedTime, tl.duration())],
          dif = snapTime - wrappedTime;
        Math.abs(dif) > tl.duration() / 2 &&
          (dif += dif < 0 ? tl.duration() : -tl.duration());
        lastSnap = (time + dif) / tl.duration() / -ratio;
        return lastSnap;
      },
      onRelease() {
        syncIndex();
        draggable.isThrowing && (indexIsDirty = true);
      },
      onThrowComplete: syncIndex,
    })[0];
    tl.draggable = draggable;
  }
  tl.closestIndex(true);
  lastIndex = curIndex;
  onChange && onChange(items[curIndex], curIndex);
  return tl;
}

export default horizontalLoop;

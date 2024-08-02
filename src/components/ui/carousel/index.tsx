import React, {
  ComponentPropsWithRef,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import "./style.scss";
import horizontalLoop from "@/helpers/horizontalLoop";
import {
  CarouselContext,
  useCarouselContext,
} from "@/components/ui/carousel/context";
import { toArray } from "gsap/gsap-core";
import { useUniqueId } from "@/hooks/useUniqueId.tsx";
import Mark from "@assets/mark.svg?react";
import ArrowLeft from "@assets/arrowLeft.svg?react";
import ArrowRight from "@assets/arrowRight.svg?react";
import Timeline = gsap.core.Timeline;
interface ICarousel extends ComponentPropsWithRef<"div"> {}

const Carousel: FC<ICarousel> = ({ className, children }) => {
  const [id, setId] = useState<string>("");
  const [slideCount, setSlideCount] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const incrementSlideCount = () => setSlideCount((prev) => prev + 1);
  return (
    <CarouselContext.Provider
      value={{
        id,
        setId,
        slideCount,
        incrementSlideCount,
        activeSlide,
        setActiveSlide,
      }}
    >
      <div className={clsx("carousel", className)}>{children}</div>
    </CarouselContext.Provider>
  );
};

const CarouselList: FC = ({ children, className }) => {
  const { setId, setActiveSlide, activeSlide } = useCarouselContext();
  const id = useUniqueId();
  const [loop, setLoop] = useState<undefined | Timeline>(null!);
  useEffect(() => {
    setId(id);
    const boxes = toArray(`#carousel_${id} .carousel__slide`);
    setLoop(
      horizontalLoop(boxes, {
        paused: true,
        draggable: true,
        center: true,
        onChange: (element, index) => {
          setActiveSlide(index);
        },
      }),
    );

    boxes.forEach((box, i) =>
      box.addEventListener("click", () => {
        loop?.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
        setActiveSlide(i);
      }),
    );

    return () => {
      boxes.forEach((box, i) =>
        box.removeEventListener("click", () => {
          loop?.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
          setActiveSlide(i);
        }),
      );
    };
  }, []);

  useEffect(() => {
    loop?.toIndex(activeSlide, { duration: 0.8, ease: "power1.inOut" });
  }, [activeSlide]);

  return (
    <div className={clsx("carousel__list", className)} id={"carousel_" + id}>
      {children}
    </div>
  );
};

interface ISlide extends ComponentPropsWithRef<"div"> {}

const Slide: FC<ISlide> = ({ className, children }) => {
  const hasCountedRef = useRef(false);
  const id = useUniqueId();
  const { incrementSlideCount } = useCarouselContext();
  useEffect(() => {
    if (!hasCountedRef.current) {
      incrementSlideCount();
      hasCountedRef.current = true;
    }
  }, []);
  return (
    <div className={clsx("carousel__slide", className)} id={id}>
      {children}
    </div>
  );
};

interface ICarouselControl extends ComponentPropsWithRef<"div"> {}
const CarouselControl: FC<ICarouselControl> = ({ className }) => {
  const { slideCount, setActiveSlide, activeSlide } = useCarouselContext();
  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };
  return (
    <div className="carousel__control">
      <button onClick={handlePrev}>
        <ArrowLeft className="carousel__button" />
      </button>
      <div className="carousel__marks">
        {Array.from({ length: slideCount }).map((i, index) => {
          return (
            <Mark
              className={clsx(
                "carousel__mark",
                index == activeSlide ? "carousel__mark_active" : "",
              )}
              onClick={() => setActiveSlide(index)}
              key={index}
            />
          );
        })}
      </div>
      <button onClick={handleNext}>
        <ArrowRight className="carousel__button" />
      </button>
    </div>
  );
};

export { Carousel, Slide, CarouselControl, CarouselList };

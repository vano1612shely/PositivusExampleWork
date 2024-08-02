import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeaderImg from "@assets/header_illustration.svg?react";
const HeaderIllustration = () => {
  const container = useRef(null!);

  useGSAP(
    () => {
      const orbitTimeline = gsap.timeline({ repeat: -1 });
      orbitTimeline
        .from("#orbit_1", {
          duration: 1,
          opacity: 0,
        })
        .from("#orbit_2", {
          duration: 1,
          opacity: 0,
        })
        .from("#orbit_3", {
          duration: 1,
          opacity: 0,
        });
      gsap.to(["#icon_heart", "#icon_link", "#icon_play", "#icon_mark"], {
        duration: 5,
        x: "random(10, -30)",
        y: "random(10, 30)",
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
      });
    },
    { scope: container },
  );
  return (
    <div ref={container} className="w-full lg:w-[37.5rem]">
      <HeaderImg className="w-full" />
    </div>
  );
};
export default HeaderIllustration;

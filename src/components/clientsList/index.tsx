import Amazon from "@assets/logos/amazon.svg?react";
import Dribble from "@assets/logos/dribble.svg?react";
import Hubspot from "@assets/logos/hubspot.svg?react";
import Notion from "@assets/logos/notion.svg?react";
import Netflix from "@assets/logos/netflix.svg?react";
import Zoom from "@assets/logos/zoom.svg?react";
import "./style.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
const Logos = () => {
  return (
    <>
      <div className="clients__block clients__block-top">
        <Amazon className="clients__logo" />
        <Dribble className="clients__logo" />
        <Hubspot className="clients__logo" />
      </div>
      <div className="clients__block clients__block-bottom">
        <Notion className="clients__logo" />
        <Netflix className="clients__logo" />
        <Zoom className="clients__logo" />
      </div>
    </>
  );
};
const ClientsList = () => {
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null!);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".clients__block-top",
          {
            xPercent: -140,
          },
          {
            duration: 5,
            repeat: -1,
            xPercent: 110,
            ease: "none",
          },
        );
        gsap.fromTo(
          ".clients__block-bottom",
          {
            xPercent: 140,
          },
          {
            duration: 5,
            repeat: -1,
            xPercent: -110,
            ease: "none",
          },
        );
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className="w-full">
      <div className="clients">
        <Logos />
      </div>
    </div>
  );
};

export default ClientsList;

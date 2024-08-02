import { ComponentPropsWithRef, FC, useRef } from "react";
import Button from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Svg from "@assets/Illustration1.svg?react";
import "./style.scss";
import clsx from "clsx";
const Cta: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const container = useRef<HTMLDivElement>(null!);
  useGSAP(
    () => {
      gsap.from("#il1-star-1", {
        rotationY: 360,
        rotationZ: 360,
        transformOrigin: "center",
        duration: 5,
        repeat: -1,
        ease: "none",
      });
      gsap.to("#il1-smile-left-eye", {
        ry: 0,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        repeatDelay: 1,
      });
      gsap.to("#il1-smile-right-eye", {
        ry: 0,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        repeatDelay: 1,
      });
    },
    { scope: container },
  );
  return (
    <section className={clsx("cta", className)} ref={container}>
      <div className="cta__block">
        <h3>Let’s make things happen</h3>
        <p>
          Contact us today to learn more about how our digital marketing
          services can help your business grow and succeed online.
        </p>
        <Button variant="secondary">Get your free proposal</Button>
      </div>
      <Svg className="cta__img" />
    </section>
  );
};

export default Cta;

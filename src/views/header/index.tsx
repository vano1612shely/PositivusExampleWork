import Button from "@/components/ui/button";
import HeaderIllustration from "../../components/headerIllustration";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ComponentPropsWithRef, FC, useRef } from "react";
import Menu from "@/components/menu";
import "./style.scss";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
import ClientsList from "../../components/clientsList";
import clsx from "clsx";

const Header: FC<ComponentPropsWithRef<"div">> = ({ className, ...rest }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width } = useWindowDimensions();
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".header__title", {
      x: -500,
      opacity: 0,
      duration: 0.5,
    }).from(".header__text", {
      x: -500,
      opacity: 0,
      duration: 0.5,
    });
  });
  return (
    <header className={clsx("header", className)} ref={containerRef}>
      <Menu />
      <div className="header__content">
        <div className="flex flex-col gap-[2.188rem] max-w-[33rem] items-start m-auto lg:m-0">
          <h1 className="header__title">
            Navigating the digital landscape for success
          </h1>
          {width < 1024 && <HeaderIllustration />}
          <p className="header__text">
            Our digital marketing agency helps businesses grow and succeed
            online through a range of services including SEO, PPC, social media
            marketing, and content creation.
          </p>
          <Button variant="secondary" className="header__button">
            Book a consultation
          </Button>
        </div>
        {width >= 1024 && <HeaderIllustration />}
      </div>
      <ClientsList />
    </header>
  );
};
export default Header;

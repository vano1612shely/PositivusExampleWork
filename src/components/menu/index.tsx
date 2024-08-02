import Logo from "@/components/ui/logo";
import MenuBurger from "@/assets/menu.svg?react";
import "./style.scss";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
export const menuItems = [
  { title: "About us", link: "#about" },
  { title: "Services", link: "#services" },
  { title: "Use Cases", link: "#usecases" },
  { title: "Pricing", link: "#pricing" },
  { title: "Blog", link: "#blog" },
];
const Menu = () => {
  const container = useRef(null!);
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const mm = gsap.matchMedia();
  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true, reversed: true });
      mm.add("(max-width: 1023px)", () => {
        tl.to("#burger_top", { rotate: 45, duration: 0.1, y: 0 })
          .to("#burger_bottom", {
            duration: 0.1,
            y: 1,
            rotate: -45,
          })
          .to("#burger_middle", {
            opacity: 0,
            duration: 0.1,
          })
          .to(".menu__list", {
            duration: 0,
            display: "flex",
            position: "fixed",
            background: "white",
            flexDirection: "column",
            paddingTop: "5rem",
            zIndex: 10,
          })
          .to(".menu__list", {
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
          });
      });
      gsap.from(".menu__item", {
        opacity: 0,
        x: -20,
        y: -20,
        duration: 0.2,
        stagger: 0.2,
      });
      const openMenu = contextSafe(() => {
        tl.reversed() ? tl.play() : tl.reverse();
      });
      buttonRef.current.addEventListener("click", openMenu);
      return () => {
        buttonRef.current.removeEventListener("click", openMenu);
      };
    },
    { scope: container },
  );
  return (
    <nav className="menu" ref={container}>
      <Logo variant="dark" />
      <button className="menu__button" ref={buttonRef}>
        <MenuBurger />
      </button>
      <ul className="menu__list">
        {menuItems.map((item, index) => {
          return (
            <li className="menu__item" key={index}>
              <a href={item.link} className="menu__link">
                {item.title}
              </a>
            </li>
          );
        })}
        <li className="menu__item">
          <a to="#request">
            <Button variant="outline">Request a quote</Button>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Menu;

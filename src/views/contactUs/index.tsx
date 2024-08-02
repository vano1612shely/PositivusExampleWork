import { ComponentPropsWithRef, FC, useRef } from "react";
import "./style.scss";
import Label from "@/components/ui/label";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Image from "@assets/contact-us_illustration.svg?react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
const ContactUs: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null!);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to("#contact-us__circle", {
          rotate: "+=360",
          transformOrigin: "50%",
          ease: "none",
          repeat: -1,
          duration: 15,
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <section className={clsx("contact-us", className)} ref={containerRef}>
      <div className="contact-us__header">
        <Label className="contact-us__header-title" variant="primary">
          <h2>Contact Us</h2>
        </Label>
        <p className="contact-us__header-text">
          Connect with Us: Let's Discuss Your
          {width >= 1024 && <br />} Digital Marketing Needs
        </p>
      </div>
      <form className="contact-us__form">
        <div className="flex gap-[2.2rem] mb-[15px]">
          <Radio text="Say Hi" name="radio" value="say_hi" />
          <Radio text="Get a Quote" name="radio" value="quote" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="name" className="text-mob-base lg:text-base">
            Name
          </label>
          <Input type="text" id="name" name="name" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="email" className="text-mob-base lg:text-base">
            Email*
          </label>
          <Input type="email" id="email" name="email" />
        </div>
        <div className="flex flex-col gap-[5px] mb-[15px]">
          <label htmlFor="name" className="text-mob-base lg:text-base">
            Message*
          </label>
          <Textarea id="message" name="message" />
        </div>
        <Button variant="secondary">Send Message</Button>
      </form>
      {width >= 1024 && <Image className="contact-us__img" />}
    </section>
  );
};

export default ContactUs;

import Label from "@/components/ui/label";
import CustomLink from "@/components/ui/link";
import {
  ComponentPropsWithRef,
  FC,
  LegacyRef,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import clsx from "clsx";
import "./style.scss";
import Card from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useUniqueId } from "@/hooks/useUniqueId.tsx";

interface IServiceList extends ComponentPropsWithRef<"div"> {}

const ServiceList: FC<IServiceList> = ({ children }) => {
  return <ul className="services__list">{children}</ul>;
};

interface IServiceItem extends ComponentPropsWithRef<"div"> {
  label: string | ReactNode;
  img: string;
  variant: "primary" | "dark" | "light";
  animSide: "left" | "right";
}
const ServiceItem: FC<IServiceItem> = ({
  label,
  img,
  variant,
  animSide = "left",
  className,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [animated, setAnimated] = useState(false);
  const id = useUniqueId();
  useEffect(() => {
    if (inView && !animated) {
      gsap.fromTo(
        `#card${id}`,
        {
          xPercent: animSide == "left" ? -200 : 200,
          opacity: 0,
          duration: 0.5,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.5,
        },
      );
      setAnimated(true);
    }
  }, [inView]);
  return (
    <Card
      id={`card${id}`}
      className={clsx(
        variant == "primary" && "bg-primary",
        variant == "dark" && "bg-dark",
        variant == "light" && "bg-white",
        "opacity-0",
      )}
    >
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        className={clsx("services__item", className)}
        {...rest}
      >
        <Label
          variant={
            variant == "primary" || variant == "dark" ? "light" : "primary"
          }
          className={"services__title"}
        >
          {label}
        </Label>
        <CustomLink
          to={"#"}
          variant={variant == "dark" ? "light" : "dark"}
          className="services__link"
        >
          Learn more
        </CustomLink>
        <img src={img} alt="img" className="services__img" />
      </div>
    </Card>
  );
};

export { ServiceItem, ServiceList };

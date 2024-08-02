import Label from "@/components/ui/label";
import "./style.scss";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
import { ServiceList, ServiceItem } from "./Service.tsx";
import IMAGES from "@assets/images.tsx";
import { ComponentPropsWithRef, FC, ReactNode } from "react";
import clsx from "clsx";
const services: {
  label: string | ReactNode;
  img: string;
  variant: "light" | "primary" | "dark";
}[] = [
  {
    label: (
      <h3>
        Search engine <br />
        optimization
      </h3>
    ),
    img: IMAGES.service1,
    variant: "light",
  },
  {
    label: (
      <h3>
        Pay-per-click <br />
        advertising
      </h3>
    ),
    img: IMAGES.service2,
    variant: "primary",
  },
  {
    label: (
      <h3>
        Social Media <br />
        Marketing
      </h3>
    ),
    img: IMAGES.service3,
    variant: "dark",
  },
  {
    label: (
      <h3>
        Email <br />
        Marketing
      </h3>
    ),
    img: IMAGES.service4,
    variant: "light",
  },
  {
    label: (
      <h3>
        Content <br />
        Creation
      </h3>
    ),
    img: IMAGES.service5,
    variant: "primary",
  },
  {
    label: (
      <h3>
        Analytics and <br />
        Tracking
      </h3>
    ),
    img: IMAGES.service6,
    variant: "dark",
  },
];
const Services: FC<ComponentPropsWithRef<"div">> = ({ className, ...rest }) => {
  const { width } = useWindowDimensions();
  return (
    <section id="services" className={clsx("services", className)} {...rest}>
      <div className="services__header">
        <Label className="services__header-title" variant="primary">
          <h2>Services</h2>
        </Label>
        <p className="services__header-text">
          At our digital marketing agency, we offer a range of services to{" "}
          {width >= 1024 && <br />} help businesses grow and succeed online.
          These services include:
        </p>
      </div>
      <ServiceList>
        {services.map((service, index) => (
          <ServiceItem
            className="animate"
            key={index}
            label={service.label}
            img={service.img}
            variant={service.variant}
            animSide={index % 2 == 0 ? "left" : "right"}
          />
        ))}
      </ServiceList>
    </section>
  );
};

export default Services;

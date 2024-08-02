import { ComponentPropsWithRef, FC } from "react";
import "./style.scss";
import clsx from "clsx";
import Label from "@/components/ui/label";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
import {
  Carousel,
  CarouselControl,
  CarouselList,
  Slide,
} from "@/components/ui/carousel";

const testimonialsData = [
  {
    text: '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
    name: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    text: '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
    name: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    text: '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
    name: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    text: '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
    name: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    text: '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
    name: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
];
const Testimonials: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const { width } = useWindowDimensions();
  return (
    <section className={clsx("testimonials", className)}>
      <div className="testimonials__header">
        <Label variant="primary">
          <h2>Testimonials</h2>
        </Label>
        <p>
          Hear from Our Satisfied Clients: Read Our Testimonials
          {width >= 1024 && <br />} to Learn More about Our Digital Marketing
          Services
        </p>
      </div>
      <Carousel className="testimonials__carousel">
        <CarouselList className="mb-[7.75rem]">
          {testimonialsData.map((testimonial, index) => (
            <Slide key={index}>
              <div className="testimonials__item">
                <p className="testimonials__text">{testimonial.text}</p>
                <div className="testimonials__author">
                  <h4 className="testimonials__name">{testimonial.name}</h4>
                  <p className="testimonials__position">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </Slide>
          ))}
        </CarouselList>
        <CarouselControl />
      </Carousel>
    </section>
  );
};

export default Testimonials;

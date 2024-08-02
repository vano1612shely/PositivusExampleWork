import "./style.scss";
import { ComponentPropsWithRef, FC } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@/components/ui/accordion";
import Label from "@/components/ui/label";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
const workingProcessData = [
  {
    title: "Consultation",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
  {
    title: "Research and Strategy Development",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
  {
    title: "Implementation",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
  {
    title: "Monitoring and Optimization",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
  {
    title: "Reporting and Communication",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
  {
    title: "Continual Improvement",
    text: `During the initial consultation, we will discuss your business\ngoals and objectives, target audience, and current marketing\nefforts. This will allow us to understand your needs and tailor\nour services to best fit your requirements.`,
  },
];
const WorkingProcess: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const { width } = useWindowDimensions();
  return (
    <section className={clsx("", className)}>
      <div className="working-process__header">
        <Label variant="primary">
          <h2>Our Working Process </h2>
        </Label>
        <p>
          Step-by-Step Guide to Achieving{width >= 1024 && <br />} Your Business
          Goals
        </p>
      </div>
      <Accordion>
        {workingProcessData.map((workingProcess, index) => (
          <AccordionItem key={index}>
            <AccordionHeader>
              <div className="working-process__title">
                <span className="working-process__number">
                  {++index < 10 ? "0" + index : index}
                </span>
                {workingProcess.title}
              </div>
            </AccordionHeader>
            <AccordionContent>
              <p>{workingProcess.text}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default WorkingProcess;

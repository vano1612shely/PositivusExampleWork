import { ComponentPropsWithRef, FC, useEffect, useRef } from "react";
import "./style.scss";
import clsx from "clsx";
import Label from "@/components/ui/label";
import useWindowDimensions from "@/hooks/windowDimensions";
import CustomLink from "@/components/ui/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { snap, toArray } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

const caseStudiesData = [
  {
    text: "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
    link: "#",
  },
  {
    text: "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
    link: "#",
  },
  {
    text: "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
    link: "#",
  },
];

const CaseStudies: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null!);
  const pickerRef = useRef<HTMLDivElement>(null!);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        if (isMobile) {
          const cells = cellsRef.current;
          const totalWidth = cells.length * 390; // Assuming each item is 300px wide

          gsap.set(pickerRef.current, {
            width: totalWidth,
          });

          Draggable.create(pickerRef.current, {
            type: "x",
            bounds: {
              minX: -totalWidth + containerRef.current.clientWidth,
              maxX: 0,
            },
            edgeResistance: 0.65,
            inertia: true,
            snap: {
              x: snap(380), // Snap to each cell (assuming each item is 300px wide)
            },
            onDrag: () => {
              gsap.to(pickerRef.current, {
                duration: 0.5,
                ease: "power1.inOut",
              });
            },
          });
        }
      },
    );

    return () => {
      mm.revert();
    };
  }, [width]);

  useEffect(() => {
    cellsRef.current = cellsRef.current.slice(0, caseStudiesData.length);
  }, [caseStudiesData.length]);
  return (
    <section className={clsx("case-studies", className)} ref={containerRef}>
      <div className="case-studies__header">
        <Label variant="primary">
          <h2>Case Studies</h2>
        </Label>
        <p>
          Explore Real-Life Examples of Our Proven Digital Marketing{" "}
          {width >= 1024 && <br />} Success through Our Case Studies
        </p>
      </div>
      <div className="case-studies__list" ref={pickerRef}>
        {caseStudiesData.map((study, index) => (
          <>
            <div
              className="case-studies__item"
              ref={(el) => (cellsRef.current[index] = el!)}
            >
              <p className="case-studies__text">{study.text}</p>
              <CustomLink to={study.link} variant="simple-primary">
                Learn more
              </CustomLink>
            </div>
            {index < caseStudiesData.length - 1 && (
              <div className="case-studies__separator"></div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;

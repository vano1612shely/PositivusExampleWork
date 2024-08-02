import "./style.scss";
import { ComponentPropsWithRef, FC } from "react";
import clsx from "clsx";
import Label from "@/components/ui/label";
import useWindowDimensions from "@/hooks/windowDimensions.tsx";
import Card from "@/components/ui/card";
import IMAGES from "@assets/images.tsx";
import { Link } from "react-router-dom";
import LinkedIn from "@assets/linkedin.svg?react";
import Button from "@/components/ui/button";
const teamData = [
  {
    img: IMAGES.worker1,
    name: "John Smith",
    position: "CEO and Founder",
    link: "#",
    content:
      "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  {
    img: IMAGES.worker2,
    name: "Jane Doe",
    position: "Director of Operations",
    link: "#",
    content:
      "7+ years of experience in project management and team leadership. Strong organizational and communication skills",
  },
  {
    img: IMAGES.worker3,
    name: "Michael Brown",
    position: "Senior SEO Specialist",
    link: "#",
    content:
      "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",
  },
  {
    img: IMAGES.worker4,
    name: "Emily Johnson",
    position: "PPC Manager",
    link: "#",
    content:
      "3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis",
  },
  {
    img: IMAGES.worker5,
    name: "Brian Williams",
    position: "Social Media Specialist",
    link: "#",
    content:
      "4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement",
  },
  {
    img: IMAGES.worker6,
    name: "Sarah Kim",
    position: "Content Creator",
    link: "#",
    content:
      "2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries",
  },
];
const Team: FC<ComponentPropsWithRef<"div">> = ({ className }) => {
  const { width } = useWindowDimensions();
  return (
    <section className={clsx("team", className)}>
      <div className="team__header">
        <Label variant="primary">
          <h2>Team</h2>
        </Label>
        <p>
          Meet the skilled and experienced team behind our
          {width >= 1024 && <br />} successful digital marketing strategies
        </p>
      </div>
      <ul className="team__list">
        {teamData.map((item, index) => (
          <li key={index}>
            <Card className="team__item">
              <div className="team__item-header">
                <div className="team__img-block">
                  <img
                    src={item.img}
                    alt="Worker image"
                    className="team__img"
                  />
                </div>
                <div className="team__worker">
                  <h4>{item.name}</h4>
                  <p>{item.position}</p>
                </div>
                <Link to={item.link} className="team__link">
                  <LinkedIn />
                </Link>
              </div>
              <div className="team__separator"></div>
              <p className="team__item-content">{item.content}</p>
            </Card>
          </li>
        ))}
      </ul>
      <div className="w-full text-right">
        <Button variant="secondary" className="team__button">
          See all team
        </Button>
      </div>
    </section>
  );
};

export default Team;

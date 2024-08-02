import { ComponentPropsWithRef, FC } from "react";
import "./style.scss";
import clsx from "clsx";
interface ICard extends ComponentPropsWithRef<"div"> {}

const Card: FC<ICard> = ({ className, ...rest }) => {
  return <div className={clsx("card", className)} {...rest}></div>;
};

export default Card;

import { ComponentPropsWithRef, FC } from "react";
import clsx from "clsx";
import "./style.scss";
interface IInput extends ComponentPropsWithRef<"input"> {}

const Input: FC<IInput> = ({ type, className, ...rest }) => {
  return <input type={type} className={clsx("input", className)} {...rest} />;
};

export default Input;

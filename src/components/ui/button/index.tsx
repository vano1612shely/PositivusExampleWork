import { ComponentPropsWithoutRef, FC } from "react";
import clsx from "clsx";
import "./style.scss";
interface IButton extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary" | "outline";
}

const Button: FC<IButton> = ({
  variant = "primary",
  children,
  className,
  ...rest
}) => {
  return (
    <button className={clsx(`button button_${variant}`, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;

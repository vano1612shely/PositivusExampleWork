import { ComponentPropsWithoutRef, FC } from "react";
import clsx from "clsx";
import "./style.scss";
interface ILabel extends ComponentPropsWithoutRef<"h2"> {
  variant: "primary" | "dark" | "light";
}
const Label: FC<ILabel> = ({
  variant = "primary",
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx(`label label_${variant}`, className)} {...rest}>
      {children}
    </div>
  );
};

export default Label;

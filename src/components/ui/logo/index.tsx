import { FC } from "react";
import { ComponentPropsWithRef } from "react";
import LogoImg from "@assets/logo.svg?react";
import clsx from "clsx";
import "./style.scss";
interface ILogo extends ComponentPropsWithRef<"div"> {
  variant: "dark" | "light";
}
const Logo: FC<ILogo> = ({ variant = "dark", className, ...rest }) => {
  return (
    <div className={clsx(`logo logo_${variant}`, className)} {...rest}>
      <LogoImg />
    </div>
  );
};

export default Logo;

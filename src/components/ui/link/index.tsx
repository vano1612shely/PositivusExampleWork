import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import LinkImg from "@assets/link.svg?react";
import clsx from "clsx";
import "./style.scss";

interface ILink extends LinkProps {
  variant:
    | "simple-primary"
    | "simple-dark"
    | "simple-light"
    | "light"
    | "dark"
    | "primary";
}

const CustomLink: FC<ILink> = ({
  variant = "simple-primary",
  to,
  className,
  children,
  ...rest
}) => {
  const isSimple = variant.startsWith("simple");
  return (
    <Link
      to={to}
      className={clsx(
        `link`,
        isSimple ? `link_simple link_${variant}` : `link_${variant}`,
        className,
      )}
      {...rest}
    >
      <LinkImg className="link__icon" />
      {children && <p className={clsx("link__text")}>{children}</p>}
    </Link>
  );
};

export default CustomLink;

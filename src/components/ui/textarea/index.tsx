import "./style.scss";
import cslx from "clsx";
import { ComponentPropsWithRef, FC } from "react";
import clsx from "clsx";

interface ITextArea extends ComponentPropsWithRef<"textarea"> {
  resizeble?: boolean;
}

const TextArea: FC<ITextArea> = ({
  name,
  className,
  id,
  cols,
  rows = 5,
  resizeble = false,
  ...rest
}) => {
  return (
    <textarea
      className={clsx(
        "textarea",
        resizeble ? "textarea_resizeble" : "",
        className,
      )}
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      {...rest}
    ></textarea>
  );
};

export default TextArea;

import "./style.scss";
import { ComponentPropsWithRef, FC, useId } from "react";
import clsx from "clsx";

interface IRadio extends ComponentPropsWithRef<"input"> {
  text: string;
}

const Radio: FC<IRadio> = ({ className, name, text, value, ...rest }) => {
  const id = useId();
  return (
    <label className="radio" htmlFor={`radio-${id}`}>
      <input
        id={`radio-${id}`}
        type="radio"
        value={value}
        className={clsx("radio__input", className)}
        name={name}
        {...rest}
      />
      <span className="radio__checkmark"></span>
      {text}
    </label>
  );
};

export default Radio;

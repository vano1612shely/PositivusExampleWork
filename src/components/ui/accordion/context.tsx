import { createContext, useContext } from "react";

interface IAccordionContext {
  openId: string;
  setOpenId: (id: (prevId) => string) => void;
}
const AccordionContext = createContext<IAccordionContext>(null!);

const useAccordionContext = () => {
  const props = useContext(AccordionContext);
  if (!props) {
    throw new Error("Accordion context is undefined");
  }
  return props;
};

interface IAccordionItemContext {
  id: string;
}
const AccordionItemContext = createContext<IAccordionItemContext>(null!);

const useAccordionItemContext = () => {
  const props = useContext(AccordionItemContext);
  if (!props) {
    throw new Error("Accordion context is undefined");
  }
  return props;
};

export {
  useAccordionContext,
  AccordionContext,
  useAccordionItemContext,
  AccordionItemContext,
};

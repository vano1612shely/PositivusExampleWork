import { ComponentPropsWithRef, FC, useEffect, useId, useState } from "react";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "@/components/ui/accordion/context.tsx";
import "./style.scss";
import Card from "@/components/ui/card";
import clsx from "clsx";
import Plus from "@/assets/plus.svg?react";
import Minus from "@/assets/minus.svg?react";
interface IAccordion extends ComponentPropsWithRef<"div"> {}

const Accordion: FC<IAccordion> = ({ children }) => {
  const [openId, setOpenId] = useState<string>("");
  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

interface IAccordionItem extends ComponentPropsWithRef<"div"> {}
const AccordionItem: FC<IAccordionItem> = ({ children }) => {
  const { openId } = useAccordionContext();
  const id = useId();
  return (
    <AccordionItemContext.Provider value={{ id: id }}>
      <Card
        className={clsx(
          "accordion__item",
          openId == id && "accordion__item_active",
        )}
      >
        {children}
      </Card>
    </AccordionItemContext.Provider>
  );
};

interface IAccordionHeader extends ComponentPropsWithRef<"div"> {}

const AccordionHeader: FC<IAccordionHeader> = ({ children }) => {
  const { setOpenId, openId } = useAccordionContext();
  const { id } = useAccordionItemContext();
  return (
    <div className="accordion__header">
      {children}{" "}
      <button
        className="accordion__button"
        onClick={() => {
          setOpenId((prevId) => (prevId === id ? "" : id));
        }}
      >
        {openId !== id ? <Plus /> : <Minus />}
      </button>
    </div>
  );
};

interface IAccordionContent extends ComponentPropsWithRef<"div"> {}

const AccordionContent: FC<IAccordionContent> = ({ children }) => {
  const { openId } = useAccordionContext();
  const { id } = useAccordionItemContext();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(openId === id);
  }, [openId, id]);

  if (open)
    return (
      <>
        <div className="accordion__separator"></div>
        <div className="accordion__content">{children}</div>
      </>
    );

  return null;
};

export { Accordion, AccordionItem, AccordionHeader, AccordionContent };

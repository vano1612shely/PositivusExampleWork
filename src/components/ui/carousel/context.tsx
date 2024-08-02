import { createContext, useContext } from "react";
interface ICarouselContext {
  id: string;
  setId: (id: string) => void;
  slideCount: number;
  incrementSlideCount: () => void;
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}
const CarouselContext = createContext<ICarouselContext>(null!);

const useCarouselContext = () => {
  const props = useContext(CarouselContext);
  if (!props) {
    throw new Error("Accordion context is undefined");
  }
  return props;
};

export { CarouselContext, useCarouselContext };

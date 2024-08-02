import { useRef } from "react";

export const useUniqueId = () => {
  const idRef = useRef<string>(`${Math.random().toString(36).substr(2, 9)}`);
  return idRef.current;
};

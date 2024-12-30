import { useEffect, useState } from "react";
import { getViewportSize } from "@/utils/viewport";

export const useViewport = () => {
  const [size, setSize] = useState<{ vw: number; vh: number }>(getViewportSize);

  useEffect(() => {
    const resize = () => setSize(getViewportSize());

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return {
    vw: size?.vw,
    vh: size?.vh,
  };
};

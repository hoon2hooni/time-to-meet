import { useEffect, useRef } from "react";
export default function useResizeEvent(cb: () => void) {
  const cbRef = useRef(cb);
  useEffect(() => {
    const resizeHandler = cbRef.current;
    if (window !== undefined) {
      resizeHandler();
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, []);
}

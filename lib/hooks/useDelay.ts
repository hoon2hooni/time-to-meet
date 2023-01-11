import { useEffect, useState } from "react";
export default function useDelay<T>(time: number, deps?: T) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => {
      setReady(true);
    }, 500);
    return () => {
      clearTimeout(id);
      setReady(false);
    };
  }, [deps]);
  return ready;
}

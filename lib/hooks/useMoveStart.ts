import { normalizeTouchAndMouseEvent } from "@lib/handleCrossPlatform";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
type MouseEventType = "mousemove" | "mousedown";
type TouchEventType = "touchmove" | "touchstart";
type MouseAndTouchEventConfig = {
  eventType: MouseEventType | TouchEventType;
  ref?: RefObject<HTMLElement>;
  skipEvent?: boolean;
};

type ExceptEventType = Omit<MouseAndTouchEventConfig, "eventType">;
export default function useMoveStart(config: ExceptEventType = {}) {
  const { clientX, clientY, setStart } = useMouseEvent({
    eventType: "mousedown",
    ...config,
  });
  return {
    startClientX: clientX,
    startClientY: clientY,
    setInit: setStart,
  } as const;
}

export function useMoving(config: ExceptEventType = {}) {
  const { clientX, clientY, setStart } = useMouseEvent({
    eventType: "mousemove",
    ...config,
  });

  return {
    moveClientX: clientX,
    moveClientY: clientY,
    setInitMove: setStart,
  } as const;
}

export function useMoveDone(cb: () => void) {
  useEffect(() => {
    const doneHandler = () => {
      cb();
    };
    window.addEventListener("mouseup", doneHandler);
    return () => {
      window.removeEventListener("mouseup", doneHandler);
    };
  }, [cb]);
}

const useMouseEvent = ({
  eventType,
  ref,
  skipEvent,
}: MouseAndTouchEventConfig) => {
  const [{ clientX, clientY }, setStart] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const moveStartHandler = (e: MouseEvent | TouchEvent) => {
      if (skipEvent) {
        return;
      }
      setStart(normalizeTouchAndMouseEvent(e));
    };
    const element = ref?.current ?? window;

    if (element) {
      element.addEventListener(eventType, moveStartHandler as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener(
          eventType,
          moveStartHandler as EventListener
        );
      }
    };
  }, [ref, eventType, skipEvent]);

  return { clientX, clientY, setStart } as const;
};

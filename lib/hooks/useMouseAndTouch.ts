import { normalizeTouchAndMouseEvent } from "@lib/handleCrossPlatform";
import { getIsMobile } from "@lib/handleCrossPlatform";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
type MouseEventType = "mousemove" | "mousedown";
type TouchEventType = "touchmove" | "touchstart";
type MouseAndTouchEventConfig = {
  eventType: MouseEventType | TouchEventType;
  ref?: RefObject<HTMLElement>;
  skipEvent?: boolean;
};

type ExceptEventType = Omit<MouseAndTouchEventConfig, "eventType">;
export const useMouseAndTouchStartLocation = (config: ExceptEventType = {}) => {
  const isMobile = getIsMobile();
  const eventType = isMobile ? "touchstart" : "mousedown";
  const { clientX, clientY, setStart } = useMouseAndTouchLocation({
    eventType: eventType,
    ...config,
  });
  return {
    startClientX: clientX,
    startClientY: clientY,
    setInit: setStart,
  } as const;
};

export const useMouseAndTouchMoveLocation = (config: ExceptEventType = {}) => {
  const isMobile = getIsMobile();
  const eventType = isMobile ? "touchmove" : "mousemove";
  const { clientX, clientY, setStart } = useMouseAndTouchLocation({
    eventType: eventType,
    ...config,
  });

  return {
    moveClientX: clientX,
    moveClientY: clientY,
    setInitMove: setStart,
  } as const;
};

export const useMouseAndTouchEnd = (cb: () => void) => {
  const isMobile = getIsMobile();
  const eventType = isMobile ? "touchend" : "mouseup";
  useEffect(() => {
    const doneHandler = () => {
      cb();
    };
    window.addEventListener(eventType, doneHandler);
    return () => {
      window.removeEventListener(eventType, doneHandler);
    };
  }, [cb, eventType]);
};

const useMouseAndTouchLocation = ({
  eventType,
  ref,
  skipEvent,
}: MouseAndTouchEventConfig) => {
  const [{ clientX, clientY }, setEvent] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const eventHandler = (e: MouseEvent | TouchEvent) => {
      if (skipEvent) {
        return;
      }
      setEvent(normalizeTouchAndMouseEvent(e));
    };
    const element = ref?.current ?? window;

    if (element) {
      element.addEventListener(eventType, eventHandler as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventType, eventHandler as EventListener);
      }
    };
  }, [ref, eventType, skipEvent]);

  return { clientX, clientY, setStart: setEvent } as const;
};

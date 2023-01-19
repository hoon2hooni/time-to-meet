import { normalizeTouchAndMouseEvent } from "@lib/handleCrossPlatform";
import { getIsMobile } from "@lib/handleCrossPlatform";
import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";
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
  const {
    clientX,
    clientY,
    setEvent: setStart,
  } = useMouseAndTouchLocation({
    eventType: eventType,
    ...config,
  });
  const initializeMouseAndTouchStart = useCallback(
    () => setStart({ clientX: 0, clientY: 0 }),
    [setStart]
  );
  return {
    startClientX: clientX,
    startClientY: clientY,
    setInit: setStart,
    initializeMouseAndTouchStart,
  } as const;
};

export const useMouseAndTouchMoveLocation = (config: ExceptEventType = {}) => {
  const isMobile = getIsMobile();
  const eventType = isMobile ? "touchmove" : "mousemove";
  const {
    clientX,
    clientY,
    setEvent: setMove,
  } = useMouseAndTouchLocation({
    eventType: eventType,
    ...config,
  });
  const initializeMouseAndTouchMove = useCallback(
    () => setMove({ clientX: 0, clientY: 0 }),
    [setMove]
  );
  return {
    moveClientX: clientX,
    moveClientY: clientY,
    initializeMouseAndTouchMove,
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
      setEvent(normalizeTouchAndMouseEvent(e));
    };
    const element = ref?.current ?? window;

    if (element && !skipEvent) {
      element.addEventListener(eventType, eventHandler as EventListener);
    }

    return () => {
      if (element && !skipEvent) {
        element.removeEventListener(eventType, eventHandler as EventListener);
      }
    };
  }, [ref, eventType, skipEvent]);

  return { clientX, clientY, setEvent } as const;
};

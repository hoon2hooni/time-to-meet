import useIsomorphicLayoutEffect from "@lib/hooks/useIsomorphicLayoutEffect";
import type { ReactNode } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
type PortalProps = {
  children: ReactNode;
  wrapperId?: string;
};

function Portal({ children, wrapperId = "made-by-portal" }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );
  useIsomorphicLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let madeBySystem = false;
    if (!element) {
      madeBySystem = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
    return () => {
      if (madeBySystem && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);
  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement);
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", wrapperId);
  document.body.appendChild(wrapper);
  return wrapper;
}

export default Portal;

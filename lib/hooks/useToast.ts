import { useCallback, useState } from "react";
const useToast = () => {
  const [toastKeyVal, setToastKeyVal] = useState(0);
  const toggleToast = useCallback(() => {
    setToastKeyVal((prev) => prev + 1);
  }, []);
  const isToastOpen = toastKeyVal > 0;
  return { isToastOpen, toastKeyVal, toggleToast } as const;
};

export default useToast;

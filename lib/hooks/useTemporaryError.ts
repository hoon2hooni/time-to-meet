import { useEffect, useState } from "react";
const useTemporaryError = (time: number) => {
  const [temporaryError, setTemporaryError] = useState<string>("");

  useEffect(() => {
    const id = setTimeout(() => {
      setTemporaryError("");
    }, time);
    return () => clearTimeout(id);
  }, [temporaryError, time]);

  return { temporaryError, setTemporaryError };
};

export default useTemporaryError;

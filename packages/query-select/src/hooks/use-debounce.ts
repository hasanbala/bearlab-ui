import { useEffect, useState } from "react";

export const useDebounce = (query: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [query, delay]);

  return { debouncedValue };
};

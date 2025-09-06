import { useState } from "react";

export const useCopyByInput = (
  value: string | number | undefined,
  isDisabled: boolean | undefined
) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    if (isDisabled || !value) {
      return;
    }

    window.navigator.clipboard
      .writeText(String(value))
      .then(() => {
        setIsCopy(true);
        new Promise(() =>
          setTimeout(() => {
            setIsCopy(false);
          }, 3000)
        );
      })
      .catch(() => console.warn("error", "Bir hata meydana geldi"));
  };

  return { isCopy, handleCopy };
};

export const copyToClipboard = async (text: string): Promise<void> => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is not available in this environment.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);

  try {
    textarea.select();
    if (!document.execCommand("copy")) {
      throw new Error("Clipboard copy command was rejected.");
    }
  } finally {
    document.body.removeChild(textarea);
  }
};
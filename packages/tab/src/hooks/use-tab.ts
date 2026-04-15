import { useState } from "react";

export const useTab = (initialTab = 0) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
};

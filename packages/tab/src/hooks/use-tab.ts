import { useCallback, useState } from "react";
import type { TabKey, UseTabProps, UseTabReturn } from "../types/tab.types";

export const useTab = (props: UseTabProps): UseTabReturn => {
  const { tabs, activeKey, defaultActiveKey, onChange } = props;
  const [internalKey, setInternalKey] = useState<TabKey | undefined>(
    () => defaultActiveKey ?? tabs.find((tab) => !tab.disabled)?.key
  );
  const isControlled = activeKey !== undefined;
  const activeTab = isControlled ? activeKey : internalKey;

  const setActiveTab = useCallback(
    (key: TabKey) => {
      if (key === activeTab) return;
      if (!isControlled) setInternalKey(key);
      onChange?.(key);
    },
    [activeTab, isControlled, onChange]
  );

  return { activeTab, setActiveTab };
};

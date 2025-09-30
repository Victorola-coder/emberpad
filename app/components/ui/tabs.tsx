"use client";

import { Button } from ".";
import { useState } from "react";

export default function Tabs({
  tabs,
  onChange,
  className,
  defaultValue,
  buttonClassName,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div className={`flex flex-row gap-4 md:p-[6px] ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant="secondary"
          onClick={() => handleTabChange(tab.value)}
          className={`${buttonClassName} ${
            activeTab === tab.value
              ? "bg-ember-500 text-white shadow-lg"
              : "bg-transparent text-dark-300 hover:text-white hover:bg-dark-700/50"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

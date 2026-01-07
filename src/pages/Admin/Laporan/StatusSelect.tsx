import React from "react";
import { getStatusTextColor, statusOptions } from "./statusHelpers";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  const textColor = getStatusTextColor(value);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full bg-transparent border-none p-0 text-theme-xs font-medium focus:ring-0 focus:outline-none ${textColor} ${className}`}
      style={{
        background: "transparent",
        appearance: "menulist", 
      }}
    >
      {statusOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={`${getStatusTextColor(option.value)} bg-white dark:bg-gray-800`}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
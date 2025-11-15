import React from "react";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  disabled = false,
  size = "md",
  className = "",
  children,
  style,
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        border border-gray-300 rounded-md bg-white dark:bg-gray-800
        dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${sizeClasses[size]} ${className}
      `}
      style={style}
    >
      {children && React.Children.count(children) > 0 ? children : null}
    </select>
  );
};

export default Select;

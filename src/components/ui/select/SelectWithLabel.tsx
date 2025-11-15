import React from "react";
import Select, { SelectProps } from "./Select";

export interface SelectWithLabelProps extends SelectProps {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
}

const SelectWithLabel = React.forwardRef<
  HTMLSelectElement,
  SelectWithLabelProps
>(
  (
    { label, errorMessage, helperText, required = false, id, error, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-theme-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <Select
          id={selectId}
          ref={ref}
          error={!!errorMessage || error}
          {...props}
        />

        {errorMessage && (
          <p className="mt-1 text-theme-xs text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        {helperText && !errorMessage && (
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SelectWithLabel.displayName = "SelectWithLabel";

export default SelectWithLabel;

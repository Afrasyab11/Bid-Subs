import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "../image/Image";

interface ReusableInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  error?: string;
  showPasswordToggle?: boolean;
  className?: string;
  iconClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, ReusableInputProps>(
  (
    {
      icon,
      value = "",
      onChange,
      placeholder,
      type = "text",
      error,
      showPasswordToggle = false,
      className = "",
      iconClassName = "",
      inputClassName = "",
      containerClassName = "",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;
    const shouldShowPasswordToggle = type === "password" && showPasswordToggle;

    return (
      <div className={`w-full ${containerClassName}`}>
        <div
          className={`
            relative flex items-center bg-semi_blue
            dark:bg-semi-dark backdrop-blur-sm
            border border-slate-700/50
            rounded-lg overflow-hidden
            ${isFocused ? "border-blue-500/50 ring-1 ring-blue-500/20" : ""}
            ${error ? "border-red-500/50 ring-1 ring-red-500/20" : ""}
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-slate-600/50"
            }
            ${className}
          `}
        >
          {/* Left Icon */}
          {icon && (
            <div
              className={`flex items-center justify-center px-4 ${iconClassName}`}
            >
              <Image src={icon} alt="icons" />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            className={`
  flex-1 px-4 py-3 bg-semi_blue
  dark:bg-semi-dark
  text-semi-dark dark:text-white placeholder-slate-400
  border-none outline-none
  text-base
  ${!icon ? "pl-4" : "pl-0"}
  ${shouldShowPasswordToggle ? "pr-0" : "pr-4"}
  ${inputClassName}
`}
            {...rest}
          />

          {/* Password Toggle Button */}
          {shouldShowPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              className="flex items-center justify-center px-4 text-blue hover:text-blue transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

interface CheckboxProps {
  name?: string;
  type?: string; // usually "checkbox"
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  type = "checkbox",
  value = false,
  onChange,
  className = "",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <input
      name={name}
      type={type}
      checked={value}
      onChange={onChange}
      className={`accent-[#1350E5] scale-150 cursor-pointer border !border-border-gray rounded ${className}`}
      disabled={isLoading || disabled}
    />
  );
};

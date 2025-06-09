interface ButtonProps {
  label?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children?: any;
}

const Button: React.FC<ButtonProps> = ({
  label = "",
  title = "",
  type = "button",
  className = "bg-dark text-white py-2 px-5 rounded-xl",
  onClick,
  disabled = false,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={`bg-blue py-2 px-4 w-full flex justify-center items-center ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md flex justify-center items-center"></span>
      ) : (
        <>
          {label}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

interface ButtonWithIconProps {
  label?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  children?: any;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  label = "",
  title = "",
  type = "button",
  className = "",
  onClick,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={`bg-blue py-3 px-4 w-full flex justify-center items-center ${className}`}
      disabled={isLoading}
    >
      <div className="flex items-center gap-x-2">
        {children}
        {label}
      </div>
    </button>
  );
};

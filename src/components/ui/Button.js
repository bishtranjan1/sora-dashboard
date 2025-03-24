import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  // Define base styles
  const baseStyles =
    "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex items-center justify-center";

  // Define variant styles
  const variantStyles = {
    primary: `bg-primary hover:bg-primary-dark text-white focus:ring-primary shadow-sm hover:shadow
              ${
                disabled
                  ? "opacity-60 cursor-not-allowed bg-primary-dark hover:bg-primary-dark"
                  : ""
              }`,
    secondary: `bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary shadow-sm hover:shadow
              ${
                disabled
                  ? "opacity-60 cursor-not-allowed bg-secondary-dark hover:bg-secondary-dark"
                  : ""
              }`,
    outline: `bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary
              ${
                disabled
                  ? "opacity-60 cursor-not-allowed hover:bg-transparent"
                  : ""
              }`,
    ghost: `bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary
            ${
              disabled
                ? "opacity-60 cursor-not-allowed hover:bg-transparent"
                : ""
            }`,
  };

  // Define size styles
  const sizeStyles = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-sm",
    lg: "py-2.5 px-5",
  };

  // Combine styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;

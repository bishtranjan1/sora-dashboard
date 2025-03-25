import React, { useEffect, useRef, useState } from "react";

const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  height = "320px", // Default fixed height or can be an object with { default, lg } properties
  scrollContent = false, // Whether content should scroll
}) => {
  const cardRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState({});

  useEffect(() => {
    // Handle the responsive height
    const updateHeight = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint is typically 1024px

      if (typeof height === "object") {
        // For responsive object: { default: 'auto', lg: '320px' }
        const mobileHeight = height.default || "auto";
        const desktopHeight = height.lg || "320px";

        setCurrentStyle({
          height: isMobile ? mobileHeight : desktopHeight,
        });
      } else {
        // For fixed height string
        setCurrentStyle({ height });
      }
    };

    // Set initial height
    updateHeight();

    // Add resize listener
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, [height]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col h-full ${className}`}
      style={currentStyle}
    >
      {(title || subtitle || action) && (
        <div className={`px-2 mb-2 ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      <div
        className={`bg-white rounded-xl shadow-sm flex-grow flex flex-col`}
        style={{ height: "calc(100% - 30px)" }}
      >
        <div
          className={`p-6 h-full flex flex-col ${bodyClassName} ${
            scrollContent ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;

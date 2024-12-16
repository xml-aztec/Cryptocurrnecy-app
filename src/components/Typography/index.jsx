import React from "react";
import "./index.css"; 

const Typography = ({ textSize = "md", className = "", children }) => {
  const textSizeClass = `typography-${textSize}`;

  return (
    <p className={`${textSizeClass} ${className}`}>
      {children}
    </p>
  );
};

export default Typography;
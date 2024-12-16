import React from "react";
import "./index.css";

const Button = ({ size = "md", variant = "primary", children, onClick }) => {
  const className = `button ${size} ${variant} `;
  return <button className={className} onClick={onClick}>{children}</button>;
};

export default Button;
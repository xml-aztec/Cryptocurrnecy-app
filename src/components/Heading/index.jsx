import React from "react";
import "./index.css"; 

const Heading = ({ level = 1, className = "", children }) => {
  const Tag = `h${level}`; 

  return <Tag className={`heading ${className}`}>{children}</Tag>;
};

export default Heading;
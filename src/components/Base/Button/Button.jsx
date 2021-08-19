import React from "react";
import "./Button.css";

const Button = ({ children, className, ...restProps }) => {
  return (
    <button {...restProps} className={`Button ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;

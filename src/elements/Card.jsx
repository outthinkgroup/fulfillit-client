import React from "react";

const Card = ({ className, children }) => {
  return (
    <div className={`overflow-hidden rounded p-6 shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card;

import React from "react";

const Logo = ({ includeLogo }) => {
  return (
    <div
      className="text-3xl font-bold tracking-tight text-white "
      data-includelogo={includeLogo}
    >
      <span className="mb-1 block leading-none">Sendmagnet</span>
      <span className="block whitespace-nowrap text-base font-light leading-none text-blue-100">
        by Out:think
      </span>
    </div>
  );
};

export default Logo;

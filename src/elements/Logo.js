import React from "react";
import styled from "styled-components";

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <span>fulfillit</span>
      <span className="byline">by Out:think</span>
    </div>
  );
};

export default styled(Logo)`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.5px;
  height: 100%;
  width: 100%;
  .byline {
    display: block;
    font-size: 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

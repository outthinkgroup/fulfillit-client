import React from "react";
import styled from "styled-components";

const Card = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(Card)`
  padding: 20px;
  border-radius: 4px;
  box-shadow: ${props => props.depth && props.theme.depth[props.depth]};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  overflow: hidden;
  & > {
    h1:first-child,
    h2:first-child,
    h3:first-child,
    h4:first-child,
    h5:first-child {
      margin-top: 0px;
    }
  }
`;

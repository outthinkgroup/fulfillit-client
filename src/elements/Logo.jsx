import React from "react"
import styled from "styled-components"

const Logo = ({ className, includeLogo }) => {
  console.log(includeLogo)
  return (
    <div className={className} data-includelogo={includeLogo}>
      <span>Sendmagnet</span>

      <span className="byline">by Out:think</span>
    </div>
  )
}

export default styled(Logo)`
  font-size: 34px;
  color:white;
  .byline {
    font-size: 16px;
  }
  &[data-includelogo="false"] {
    display: none;
  }

  font-weight: 800;
  letter-spacing: -0.5px;
  height: 100%;

  .byline {
    white-space: nowrap;
    display: block;
    font-weight: 300;
    color: var(--primary-light);
  }
`

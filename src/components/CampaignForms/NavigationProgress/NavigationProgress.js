import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"

import { allFieldsHaveData } from "../../../utils/formValidation"

const NavigationProgress = ({
  className,
  cards,
  changeCardTo,
  currentCard,
  formData,
}) => {
  const [parentWidth, setParentWidth] = useState()
  const progNav = useRef(null)
  useEffect(() => {
    const { width } = progNav.current.getBoundingClientRect()
    setParentWidth(width)
  })

  return (
    <div className={className} ref={progNav}>
      {cards.map((card, cardIndex) => (
        <NavItem
          key={cardIndex}
          width={parentWidth && parentWidth / cards.length}
          isActive={
            (formData && allFieldsHaveData(card, formData)) ||
            cardIndex == currentCard
          }
          onClick={() => changeCardTo(cardIndex, cards[currentCard])}
          currentCard={cardIndex == currentCard}
        />
      ))}
    </div>
  )
}

export default styled(NavigationProgress)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`
const NavItem = styled.div`
  display: inline-block;
  width: ${({ currentCard }) => (currentCard ? "40px" : "35px")};
  height: ${({ currentCard }) => (currentCard ? "40px" : "35px")};
  &:after {
    content: "";
    box-shadow: ${({ theme, currentCard }) =>
      currentCard ? theme.depth.medium : ""};
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : "#efefef"};
    border-radius: 50%;
    z-index: 1;
  }
  position: relative;
  &:not(:first-child):before {
    content: "";
    width: ${({ width }) => width}px;
    height: 2px;
    background: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : "#efefef"};
    position: absolute;
    right: 90%;
    z-index: 0;
    top: 50%;
  }
`

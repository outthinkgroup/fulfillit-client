import React, { useRef, useEffect, useState } from "react";

import { allFieldsHaveData } from "../../../utils/formValidation";

const NavigationProgress = ({ cards, changeCardTo, currentCard, formData }) => {
  const [parentWidth, setParentWidth] = useState();
  const progNav = useRef(null);
  useEffect(() => {
    const { width } = progNav.current.getBoundingClientRect();
    console.log(width);
    setParentWidth(width);
  });

  return (
    <div className="mb-8 flex w-full justify-between" ref={progNav}>
      {cards.map((card, cardIndex) => (
        <div
          className={`inline-block ${
            cardIndex == currentCard
              ? "h-[40px] w-[40px]"
              : "h-[35px] w-[35px] "
          } after:absolute after:top-[50%] after:z-10 after:h-full after:w-full after:translate-y-[-50%] after:rounded-full after:shadow ${
            (formData && allFieldsHaveData(card, formData)) ||
            cardIndex == currentCard
              ? "before:bg-blue-600 after:bg-blue-600"
              : "before:bg-blue-100 after:bg-blue-100"
          } before-content-empty after-content-empty before-width-var before:absolute before:right-[0%] before:top-[50%] before:h-1 before:translate-y-[-50%] first:before:hidden `}
          key={cardIndex}
          style={{
            ["--width"]: parentWidth && parentWidth / (cards.length - 1) + "px",
          }}
          onClick={() => changeCardTo(cardIndex, cards[currentCard])}
        />
      ))}
    </div>
  );
};
export default NavigationProgress;

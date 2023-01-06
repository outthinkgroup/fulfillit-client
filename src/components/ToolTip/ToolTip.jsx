import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export function ToolTip({ text, children, type = "notification" }) {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const el = useRef(null);
  function closeToolTip() {
    setIsToolTipOpen(false);
  }
  function showToolTip() {
    setIsToolTipOpen(true);
  }

  useOnClickOutside(el, closeToolTip);

  const typeStyle = {
    error: `bg-red-100 text-red-600`,
    notification: `bg-blue-100 text-blue-600`,
  };

  return (
    <span class="relative">
      <button
        class={`flex aspect-square w-5 items-center justify-center rounded-full  p-0 text-center text-xs font-bold ${typeStyle[type]}`}
        onClick={()=>setIsToolTipOpen(s=>!s)}
      >
        {text}
      </button>
      {isToolTipOpen ? (
        <div
          ref={el}
          class={ `absolute z-50 shadow rounded-md min-w-[170px] top-[130%] left-[50%] translate-x-[-50%] bg-blue-200 p-3 text-center text-sm ${typeStyle[type]}` }
        >
				{children}
        </div>
      ) : null}
    </span>
  );
}

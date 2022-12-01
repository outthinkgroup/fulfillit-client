import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      <div className="relative z-10 w-full min-w-[300px] translate-y-[-100px] rounded-lg border border-gray-100 bg-white p-8 shadow-xl sm:max-w-[75%] md:min-w-[500px] md:max-w-[750px]">
        <div className="absolute right-0 top-0 z-10 p-2">
          <button
            onClick={onClose}
            className="bg-transparent text-xs font-medium text-blue-500"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const modal = (props) => (
    <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );

  return { modal, isOpen, setIsOpen };
}

export function TextButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={` bg-transparent px-2 text-base font-normal capitalize tracking-normal text-white hover:bg-white hover:bg-opacity-20 ${className}`}
    >
      {children}
    </button>
  );
}

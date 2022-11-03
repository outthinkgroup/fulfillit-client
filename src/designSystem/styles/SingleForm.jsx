import {} from "react";

export const SingleForm = ({ children }) => {
  return <div className={`mx-auto max-w-xl md:mt-24`}>{children}</div>;
};
export const SigninFormWrapper = ({ children }) => (
  <div className="flex justify-center overflow-hidden rounded-lg bg-white shadow-2xl md:justify-start ">
    {children}
  </div>
);
export const Label = ({ children }) => (
  <span className="text-sm font-medium uppercase tracking-wider text-blue-900">
    {children}
  </span>
);

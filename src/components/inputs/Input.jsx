import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const Input = forwardRef(({ clearInput, ...props }, ref) => {
  // const inputClasses =
  //   "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="searchInputContainer flex items-center justify-center relative">
      <input {...props} ref={ref} className="searchInput" />
      <button onClick={clearInput}>
        <FontAwesomeIcon
          {...props}
          icon={faRemove}
          size="lg"
          className="cursor-pointer"
        />
      </button>
    </p>
  );
});

export default Input;

export const CheckoutInput = ({ label, errors, ...props }) => {
  const inputStyles = `bg-transparent rounded-md p-4 outline-none outline-[#464444] focus:outline-4`;
  const labelStyles = `text-lg tracking-wide text-[#464444] flex flex-col gap-2 my-6`;
  return (
    <label className={labelStyles}>
      {label}
      <input {...props} className={inputStyles} />
      {errors && errors}
    </label>
  );
};

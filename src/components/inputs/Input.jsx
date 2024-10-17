import React from "react";

const Input = ({ ...props }) => {
  const inputClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="searchInputContainer">
      <input {...props} className="searchInput" />
    </p>
  );
};

export default Input;

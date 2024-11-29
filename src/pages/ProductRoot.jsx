import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const ProductRoot = () => {
  return (
    <>
      <Link
        to=".."
        className="w-[85%] mx-auto flex items-center justify-start gap-4 py-2 capitalize tracking-widest font-semibold xl:max-w-7xl xl:mx-auto"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="3x" />
        go back
      </Link>
      <Outlet />
    </>
  );
};

export default ProductRoot;

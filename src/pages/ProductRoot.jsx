import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const ProductRoot = () => {
  return (
    <>
      <Link
        to=".."
        className="py-6 ml-10 flex items-center justify-start gap-4 capitalize tracking-widest font-semibold"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="3x" />
        go back
      </Link>
      <Outlet />
    </>
  );
};

export default ProductRoot;

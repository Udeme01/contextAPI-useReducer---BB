import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const ProductRoot = () => {
  return (
    <>
      <button>back</button>
      <Outlet />
      <Footer />
    </>
  );
};

export default ProductRoot;

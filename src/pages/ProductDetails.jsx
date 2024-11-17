import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  return (
    <>
      <h1>{params.productId}</h1>
    </>
  );
};

export default ProductDetails;

import React from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  return (
    <>
      <h1>{params.productId}</h1>
      <Link to="..">Back</Link>
    </>
  );
};

export default ProductDetails;

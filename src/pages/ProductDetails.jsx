import React from "react";
import ProductItem from "../components/ProductItem";
import { useLoaderData } from "react-router-dom";
import { fetchEntry } from "../components/contentful/https";

const ProductDetails = () => {
  const product = useLoaderData();

  return <ProductItem product={product} />;
};

export default ProductDetails;

export const loader = async ({ params }) => {
  const { productId } = params;

  try {
    const product = await fetchEntry(productId);
    return product;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected product",
      }),
      { status: 500 }
    );
  }
};

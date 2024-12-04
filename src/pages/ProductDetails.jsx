import React from "react";
import ProductItem from "../components/ProductItem";
import { useRouteLoaderData } from "react-router-dom";
import { fetchEntry } from "../components/contentful/https";

const ProductDetails = () => {
  const product = useRouteLoaderData("product-detail");

  return <ProductItem product={product} />;
};

export default ProductDetails;

export const loader = async ({ params }) => {
  const { productId } = params;

  try {
    const product = await fetchEntry(productId);
    return product;
  } catch (error) {
    console.log(error);
    throw new Response(null, { status: 404 });
  }
};

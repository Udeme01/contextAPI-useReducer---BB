import React from "react";
import ProductItem from "../components/ProductItem";
import { useRouteLoaderData, useNavigation } from "react-router-dom";
import { fetchEntry } from "../components/contentful/https";

const ProductDetails = () => {
  const navigation = useNavigation();
  const product = useRouteLoaderData("product-detail");

  return <ProductItem product={product} />;
};

export default ProductDetails;

export const loader = async ({ params }) => {
  const { productId } = params;

  try {
    const product = await fetchEntry(productId);
    if (!product) {
      throw new Response(
        JSON.stringify({
          message: "Product Not Found",
        }),
        { status: 404 }
      );
    }
    return product;
  } catch (error) {
    // Known error: Check if it's a 404 and rethrow it as a Response object.
    if (error instanceof Response && error.status === 404) {
      throw error; // This will bubble up and trigger a 404 error page.
    }

    // Unexpected error: Throw a 500 error.
    throw new Response(
      JSON.stringify({
        message: "Request Failed",
      }),
      { status: 500 }
    );
  }
};

import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { CartContext } from "./store/shopping-cart-context";
import { fetchAllEntries } from "./contentful/https";
import { useLoaderData } from "react-router-dom";

export default function Shop() {
  const [fitinItems, setFitinItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { searchResults } = useContext(CartContext);

  const entries = useLoaderData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        // const entries = await fetchAllEntries();
        setFitinItems(entries || []);
        setIsFetching(false);
      } catch (error) {
        console.log("error fetching entries", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = searchResults.length > 0 ? searchResults : fitinItems;

  return (
    <section id="shop">
      {isFetching ? (
        <div className="text-center text-xl">Loading product data...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-xl">No products found</div>
      ) : (
        <ul
          id="products"
          className="w-[85%] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl xl:mx-auto"
        >
          {filteredItems.map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </ul>
      )}
    </section>
  );
}

export const loader = async () => {
  try {
    const entries = await fetchAllEntries();
    return entries;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response(
      JSON.stringify({ message: "An unexpected error occurred." }),
      { status: 500 }
    );
  }
};

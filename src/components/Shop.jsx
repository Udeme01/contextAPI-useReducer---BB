import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { CartContext } from "./store/shopping-cart-context";

export default function Shop() {
  const [fitinItems, setFitinItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { searchResults } = useContext(CartContext);

  useEffect(() => {
    setIsFetching(true);
    setFitinItems(DUMMY_PRODUCTS);
    setIsFetching(false);
  }, []);

  const displayedItems = searchResults.length > 0 ? searchResults : fitinItems;

  return (
    <section id="shop">
      {isFetching ? (
        <div>Loading product data...</div>
      ) : displayedItems.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ul
          id="products"
          className="grid gap-10 sm:gap-x-0 sm:m-9 sm:grid-cols-2 lg:m-12 lg:grid-cols-3 xl:m-0 xl:max-w-7xl xl:mx-auto"
        >
          {displayedItems.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      )}
    </section>
  );
}

// .filter((product) => {
//   return search.toLowerCase() === ""
//     ? product
//     : product.title.toLowerCase().includes(search);
// })

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
        <ul id="products" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

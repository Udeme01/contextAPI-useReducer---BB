import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { CartContext } from "./store/shopping-cart-context";

export default function Shop({ query }) {
  const [fitinItems, setFitinItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { searchResults } = useContext(CartContext);
  console.log(searchResults);

  useEffect(() => {
    setIsFetching(true);
    setFitinItems(DUMMY_PRODUCTS);
    setIsFetching(false);
  }, []);

  // const filteredItems = fitinItems.filter((item) =>
  //   item.title.toLowerCase().includes(query.toLowerCase())
  // );
  // console.log(filteredItems);

  const filteredItems = searchResults.length > 0 ? searchResults : fitinItems;
  // console.log(filteredItems[0].title);

  return (
    <section id="shop">
      {isFetching ? (
        <div>Loading product data...</div>
      ) : filteredItems.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ul
          id="products"
          className="w-[85%] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl xl:mx-auto"
        >
          {filteredItems.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      )}
    </section>
  );
}

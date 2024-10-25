import React, { useEffect, useState } from "react";
import Product from "./Product";
import { DUMMY_PRODUCTS } from "../dummy-products";

export default function Shop() {
  const [fitinItems, setFitinItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    setFitinItems(DUMMY_PRODUCTS);
    setIsFetching(false);
  }, []);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       setIsFetching(true);
  //       const response = await fetch(DUMMY_PRODUCTS);

  //       console.log("Response Status:", response.status);
  //       console.log("Response Headers:", response.headers);

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch data: ${response.statusText}`);
  //       }

  //       const contentType = response.headers.get("content-type");
  //       if (!contentType || !contentType.includes("application/json")) {
  //         throw new Error("Response is not JSON");
  //       }

  //       const resData = response;
  //       console.log("Fetched data:", resData);
  //       setFitinItems(resData);
  //     } catch (error) {
  //       console.error("Error fetching items:", error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };
  //   fetchItems();
  // }, []);

  return (
    <section id="shop">
      {isFetching ? (
        <div>Loading product data...</div>
      ) : fitinItems.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ul id="products" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {fitinItems.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      )}
    </section>
  );
}

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
// import { DUMMY_PRODUCTS } from "./dummy-products.js";
// import Product from "./components/Product.jsx";

import CartContextProvider, {
  CartContext,
} from "./components/store/shopping-cart-context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Footer from "./components/Footer.jsx";
import { useContext, useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  return (
    <CartContextProvider>
      <Header query={query} setQuery={setQuery} />
      <main className="hero">
        <h1>Fit-In</h1>
        <p>
          Carefully crafted to help you be your most Confident and Stylish self.
        </p>
        <h2>
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faWhatsapp} />
        </h2>
      </main>
      {/* <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop> */}
      <Shop query={query} />
      <Footer />
    </CartContextProvider>
  );
}

// I'm using the Header and the Shop component in the app component to forward the cart data and also functions for adding items and updating the cart quantity of that cart...to the Header and the Shop component respectively.

export default App;

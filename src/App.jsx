import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
// import { DUMMY_PRODUCTS } from "./dummy-products.js";
// import Product from "./components/Product.jsx";

import CartContextProvider from "./components/store/shopping-cart-context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <CartContextProvider>
      <Header />
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
      <Shop />
    </CartContextProvider>
  );
}

// I'm using the Header and the Shop component in the app component to forward the cart data and also functions for adding items and updating the cart quantity of that cart...to the Header and the Shop component respectively.

export default App;

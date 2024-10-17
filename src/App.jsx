import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";

import CartContextProvider from "./components/store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main className="hero">
        <h1>Olu</h1>
        <p>
          Carefully crafted to help you be your most Confident and Stylish self.
        </p>
      </main>
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

// I'm using the Header and the Shop component in the app component to forward the cart data and also functions for adding items and updating the cart quantity of that cart...to the Header and the Shop component respectively.

export default App;

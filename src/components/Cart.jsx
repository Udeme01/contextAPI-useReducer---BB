import { useContext } from "react";
import { CartContext } from "./store/shopping-cart-context";

export default function Cart() {
  const { items, updateCartItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(totalPrice);
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  console.log(formattedTotalPrice);

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;
            console.log(formattedPrice);

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span className="flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                  <button onClick={() => updateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}

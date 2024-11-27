import { useContext } from "react";
import { CartContext } from "./store/shopping-cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { items, updateCartItemQuantity, clearItem } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;
            const { id, name, image, quantity, selectedColor, selectedSize } =
              item;
            const productIdSpecific = `${id}-${selectedSize}-${selectedColor}`;
            return (
              <li key={productIdSpecific}>
                <div className="flex w-full">
                  <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 rounded-md"
                  />

                  <span className="p-2 flex flex-col gap-1 font-bold">
                    <h6 className="">{name}</h6>
                    <p>{formattedPrice}</p>
                    <p>Color: {selectedColor}</p>
                    <p>Size: {selectedSize}</p>
                  </span>
                </div>
                {/* quantity */}
                <section className="flex items-end justify-between">
                  <section className="mt-4 border border-[#735932] w-fit">
                    <div className="flex items-center justify-around w-40 relative p-4">
                      <button
                        className="absolute left-0 right-28"
                        onClick={() => {
                          updateCartItemQuantity(productIdSpecific, -1);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="absolute right-0 left-28"
                        onClick={() => {
                          updateCartItemQuantity(productIdSpecific, 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </section>
                  <button onClick={() => clearItem(productIdSpecific)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size="2x"
                      color="#991b1b"
                    />
                  </button>
                </section>
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

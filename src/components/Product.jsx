import { useContext } from "react";
import { CartContext } from "./store/shopping-cart-context";
import { Link } from "react-router-dom";

export default function Product({ fields, sys }) {
  const { addItemToCart, items } = useContext(CartContext);
  // console.log("fields", fields);
  // console.log("sys", sys);

  const isInCart = items.some((productItem) => productItem.id === sys.id);

  let cartBtn = "Add to bag";
  const disabled = isInCart;

  if (items.length > 0 && isInCart) {
    cartBtn = "Added to bag";
  }

  return (
    <li className="product">
      <img
        src={fields.fitinImage.fields.file.url}
        alt={fields.fitinImage.fields.file.title}
      />
      <div className="product-content">
        <div>
          <h3>{fields.fitinTitle}</h3>
          <p className="product-price">${fields.fitinPrice}</p>
          <p>{fields.fitinDescription}</p>
        </div>
        <p className={`product-actions`}>
          <Link
            to={`${sys.id}`}
            className={`link bg-[#f4b115] hover:bg-[#f5b744] cursor-pointer`}
          >
            View Product
          </Link>
          <button
            onClick={() => addItemToCart(sys.id)}
            disabled={disabled}
            className={`${
              disabled
                ? "bg-[#f7d9a1] cursor-not-allowed"
                : "bg-[#f4b115] hover:bg-[#f5b744] cursor-pointer"
            }`}
          >
            {cartBtn}
          </button>
        </p>
      </div>
    </li>
  );
}

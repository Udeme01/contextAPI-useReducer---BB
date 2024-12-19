import { useContext } from "react";
import { CartContext } from "./store/shopping-cart-context";
import { Link } from "react-router-dom";

export default function Product({ description, id, image, price, title }) {
  const { items } = useContext(CartContext);

  const isInCart = items.some((productItem) => productItem.id === id);

  // let cartBtn = "Add to bag";
  // const disabled = isInCart;

  // if (items.length > 0 && isInCart) {
  //   cartBtn = "Added to bag";
  // }

  return (
    <>
      <li className="product">
        <img src={image} alt={title} />
        <div className="product-content">
          <div>
            <h3 className="text-[#464444] text-2xl my-4">{title}</h3>
            <p className="product-price m-0 text-lg text-[#464444] font-bold">
              ₦{price.toLocaleString('en-US')}
            </p>
            <p>{description}</p>
          </div>
          <p className={`product-actions`}>
            <Link
              to={`${id}`}
              className={`link bg-[#464444] text-[#fff] cursor-pointer w-full text-center mt-4`}
            >
              View Product
            </Link>
            {/* <button
            onClick={() => addItemToCart(id)}
            disabled={disabled}
            className={`${
              disabled
                ? "bg-[#f7d9a1] cursor-not-allowed"
                : "bg-[#f4b115] hover:bg-[#f5b744] cursor-pointer"
            }`}
          >
            {cartBtn}
          </button> */}
          </p>
        </div>
      </li>
    </>
  );
}

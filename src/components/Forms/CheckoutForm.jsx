import React, { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

const CheckoutForm = () => {
  const { items } = useContext(CartContext);
  console.log(items);

  const inputStyles = `bg-transparent border-none outline-[#f7d9a1] rounded-md p-4 outline-none focus:outline-[#be8c2d]`;

  const inputContainer = `my-8 flex flex-col gap-1`;

  const labelStyles = `text-lg tracking-wide text-[#f7d9a1]`;

  const subtotalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${subtotalPrice.toFixed(2)}`;

  return (
    <>
      <form className="m-8">
        <p className={inputContainer}>
          <label htmlFor="firstname" className={labelStyles}>
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className={inputStyles}
          />
        </p>
        <p className={inputContainer}>
          <label className={labelStyles} htmlFor="lastname">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className={inputStyles}
          />
        </p>
        <p className={inputContainer}>
          <label className={labelStyles} htmlFor="email">
            Email
          </label>
          <input type="email" id="email" name="email" className={inputStyles} />
        </p>
        <p className={inputContainer}>
          <label className={labelStyles} htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={inputStyles}
          />
        </p>
        <p className={inputContainer}>
          <label className={labelStyles} htmlFor="phone">
            Phone
          </label>
          <input type="tel" id="phone" name="phone" className={inputStyles} />
        </p>
        {/* <div className="flex gap-4">
          <input type="checkbox" className="border-none bg-transparent" />
          <p>Save this information for next time</p>
        </div> */}
        <section>
          <button
            type="button"
            onClick={() => null}
            className="flex items-center justify-between w-full p-2 my-4"
          >
            <h1 className="text-2xl capitalize">Order Summary</h1>
            <p>Hide</p>
          </button>
          {/* items in cart */}
          <ul>
            {items.map((item) => {
              const formattedPrice = `$${item.price.toFixed(2)}`;

              const { id, name, image, quantity, selectedColor, selectedSize } =
                item;
              const productIdSpecific = `${id}-${selectedSize}-${selectedColor}`;
              const totalPrice = `₦${(item.price * quantity).toFixed(2)}`;

              return (
                <li
                  key={productIdSpecific}
                  className="flex items-center justify-center"
                >
                  <div className="flex gap-3 w-full">
                    <span className="relative my-4">
                      <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 rounded-md"
                      />
                      <p className="absolute z-50 -top-2 -right-2 text-xl bg-[#f7d9a1] text-[#be8c2d] text-center flex items-center justify-center rounded-full w-8 h-8 font-bold">
                        {quantity}
                      </p>
                    </span>

                    <span className="p-2 flex flex-col gap-1 font-bold my-4">
                      <h6 className="">{name}</h6>
                      <p>{formattedPrice}</p>
                      <p>Color: {selectedColor}</p>
                      <p>Size: {selectedSize}</p>
                    </span>
                  </div>
                  <div>{totalPrice}</div>
                </li>
              );
            })}
          </ul>
          {/* item in cart 'end tag' */}
          <span
            onClick={() => null}
            className="flex items-center justify-between w-full p-2 my-6"
          >
            <h1 className="text-xl capitalize cursor-default">
              Total <span>.</span> {items.length} items{" "}
            </h1>
            <p className="text-3xl text-[#f7d9a1]">{formattedTotalPrice}</p>
          </span>
        </section>
        <button
          type="button"
          className="text-center flex items-center justify-center w-full border p-6 font-medium text-xl tracking-widest capitalize rounded-md"
        >
          proceed
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;

// ₦

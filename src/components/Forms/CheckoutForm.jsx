import React, { useContext, useState } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { Formik } from "formik";
import { CheckoutInput } from "../inputs/Input";

const CheckoutForm = () => {
  const { items } = useContext(CartContext);
  const inputContainer = `my-8 flex flex-col gap-1`;
  const inputStyles = `bg-transparent border-none outline-[#464444] rounded-md p-4 outline-none focus:outline-[#fff]`;
  const labelStyles = `text-lg tracking-wide text-[#000] flex flex-col gap-2 my-6`;

  const subtotalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${subtotalPrice.toFixed(2)}`;

  const businessWhatsAppNumber = "+2347046780531";

  const handleProceed = (values) => {
    // Generate WhatsApp message
    const productList = items
      .map((item, index) => {
        const {
          id,
          image,
          name,
          price,
          quantity,
          selectedColor,
          selectedSize,
        } = item;
        const productPrice = quantity * price;
        return `${
          index + 1
        }. ${name} (${selectedSize}, ${selectedColor}) - ${productPrice} Link: https://fitin-nine.vercel.app/${id}`;
      })
      .join("\n");

    const message = `
Hello, I want to place an order:
    
*User Details:*
- FirstName: ${values.firstname}
- LastName: ${values.lastname}
- Address: ${values.address}
- Email: ${values.email}
- Phone: ${values.phone}

*Products:*
${productList}
    `;

    // Opens WhatsApp with pre-filled message
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`
    );
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        address: "",
        email: "",
        phone: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={handleProceed}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="m-8">
          <section className={inputContainer}>
            <CheckoutInput
              label="First Name"
              type="firstname"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.firstname && touched.firstname && errors.firstname}
            />
            <CheckoutInput
              label="Last Name"
              type="lastname"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.lastname && touched.lastname && errors.lastname}
            />
            <CheckoutInput
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email && touched.email && errors.email}
            />
            <CheckoutInput
              label="Address"
              type="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.address && touched.address && errors.address}
            />
            <CheckoutInput
              label="Phone"
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.phone && touched.phone && errors.phone}
            />
          </section>
          <section>
            <button
              type="button"
              onClick={() => null}
              className="flex items-center justify-between w-full p-2 my-4"
            >
              <h1 className="text-2xl capitalize">Order Summary</h1>
              {/* <p>Hide</p> */}
            </button>
            {/* items in cart */}
            <ul>
              {items.map((item) => {
                const formattedPrice = `$${item.price.toFixed(2)}`;

                const {
                  id,
                  name,
                  image,
                  quantity,
                  selectedColor,
                  selectedSize,
                } = item;
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
                          className="w-32 rounded-md"
                        />
                        <p className="absolute z-50 -top-2 -right-2 text-xl bg-[#464444] text-[#fff] text-center flex items-center justify-center rounded-full w-8 h-8 font-bold">
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
              <p className="text-3xl text-[#464444] font-bold">
                {formattedTotalPrice}
              </p>
            </span>
          </section>

          <button
            type="submit"
            className="text-center flex items-center justify-center w-full border border-[#464444] p-4 mt-16 font-medium text-xl tracking-widest capitalize rounded-md hover:border-2"
          >
            proceed
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;

// ₦

import React, { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { Formik } from "formik";
import { CheckoutInput } from "../inputs/Input";
import { HeaderContext } from "../store/HeaderContext";

const CheckoutForm = () => {
  // context
  const { items, clearAllItems } = useContext(CartContext);
  const { headerHeight, isMediumScreen } = useContext(HeaderContext);

  // input styles
  const inputContainer = `flex flex-col md:w-1/2 md:sticky`;

  const subtotalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `₦${subtotalPrice.toLocaleString("en-US")}`;

  const businessWhatsAppNumber = "+2348072924725";

  const handleProceed = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Generate WhatsApp message
    try {
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
          // const productIdSpecific = `${id}-${selectedSize}-${selectedColor}`;
          // return `${
          //   index + 1
          // }. productName: ${name} size: ${selectedSize} color: ${selectedColor} quantity: ${quantity} price: ${productPrice}
          // `;
          return `${index + 1}.
          *Product Name:* ${name}
          *Product Size:* ${selectedSize}
          *Product Color:* ${selectedColor}
          *Quantity:* ${quantity}
          *Product Price:* ${productPrice.toLocaleString("en-US")}
          *Product Link:* Link: https://fitin-nine.vercel.app/${id}
        `;
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

        *Total Price:* ₦${items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toLocaleString("en-US")}
        `;

      if (!productList.trim()) {
        console.log("submission invalid...");
        alert(
          "Unable to process your order. Please ensure your cart contains valid products."
        );
        setSubmitting(false);
        return;
      }

      // Opens WhatsApp with pre-filled message
      const encodedMessage = encodeURIComponent(message);

      setTimeout(() => {
        window.open(
          `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`,
          "_blank"
        );
      }, 2000);

      setTimeout(() => {
        resetForm();
        setSubmitting(false);
        clearAllItems();
      }, 3000);
    } catch (error) {
      console.error("An error occurred while processing the order:", error);
      alert("Something went wrong. Please try again later.");
    }
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

        // validate First Name
        if (!values.firstname.trim()) {
          errors.firstname = "Firstname is Required";
        } else if (values.firstname.length < 2) {
          errors.firstname = "Firstname must be at least 2 characters long";
        } else if (!/^[a-zA-Z\s-]+$/.test(values.firstname)) {
          errors.firstname =
            "First name can only contain letters, spaces, or hyphens";
        }

        // validate Last Name
        if (!values.lastname) {
          errors.lastname = "Lastname is Required";
        } else if (values.lastname.length < 2) {
          errors.lastname = "Lastname must be at least 2 characters long";
        } else if (!/^[a-zA-Z\s-]+$/.test(values.lastname)) {
          errors.lastname =
            "Last name can only contain letters, spaces, or hyphens";
        }

        // validate Email
        if (!values.email) {
          errors.email = "Email is Required";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
            values.email
          )
        ) {
          errors.email = "Please enter a valid email address";
        }

        // validate Address
        if (!values.address.trim()) {
          errors.address = "Address is Required";
        } else if (values.address.length < 5) {
          errors.address = "Addresses must be at least 5 characters long";
        } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(values.address)) {
          errors.address = "Address contains invalid characters";
        }

        // valida Phone Number
        if (!values.phone.trim()) {
          errors.phone = "Phone number is Required";
        } else if (!/^\+?[0-9]{10,15}$/.test(values.phone)) {
          errors.phone =
            "Phone number must be 10-15 digits and can include a country code (e.g., +234)";
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
        isValid,
        dirty,
      }) => {
        const isDisabled =
          !isValid || !dirty || items.length === 0 || isSubmitting;
        return (
          <form
            onSubmit={handleSubmit}
            className="w-[85%] mx-auto m-8 md:flex md:gap-10 xl:max-w-7xl xl:mx-auto"
          >
            <section
              className={inputContainer}
              style={{
                top: isMediumScreen ? `${headerHeight || "112"}px` : undefined,
                height: isMediumScreen
                  ? `clamp(100vh, 100%, calc(100vh + ${
                      headerHeight || "112"
                    }px))`
                  : undefined,
              }}
            >
              <CheckoutInput
                label="First Name"
                type="firstname"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  errors.firstname && touched.firstname && errors.firstname
                }
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
              <button
                disabled={isDisabled}
                type="submit"
                className={`hidden text-center md:flex items-center justify-center w-full border text-[#fff] p-4 mt-8 font-medium text-xl tracking-widest capitalize rounded-md ${
                  isDisabled
                    ? "bg-[#46444463] cursor-not-allowed"
                    : "bg-[#464444] hover:bg-[#2c2c2c]"
                }`}
              >
                {/* {console.log("Is submitting: ", isSubmitting)} */}
                {isSubmitting ? "Submitting..." : "proceed"}
              </button>
            </section>

            <section className="md:w-1/2">
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
                  const formattedPrice = `₦${item.price.toLocaleString(
                    "en-US"
                  )}`;

                  const {
                    id,
                    name,
                    image,
                    quantity,
                    selectedColor,
                    selectedSize,
                  } = item;
                  const productIdSpecific = `${id}-${selectedSize}-${selectedColor}`;
                  const totalPrice = `₦${(item.price * quantity).toLocaleString(
                    "en-US"
                  )}`;
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
                          <p className="absolute z-0 -top-2 -right-2 text-xl bg-[#464444] text-[#fff] text-center flex items-center justify-center rounded-full w-8 h-8 font-bold">
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
              disabled={isDisabled}
              type="submit"
              className={`text-center flex items-center justify-center w-full border p-4 mt-16 font-medium text-xl tracking-widest capitalize rounded-md text-[#fff] md:hidden ${
                isDisabled
                  ? "bg-[#46444463] cursor-not-allowed"
                  : "bg-[#464444] hover:bg-[#2c2c2c]"
              }
          `}
            >
              {/* {console.log("Is submitting: ", isSubmitting)} */}
              {isSubmitting ? "Submitting..." : "proceed"}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default CheckoutForm;

// ₦

// Explanation of Validation Rules
// FIRST NAME & LAST NAME:
// Checks for non-empty values.
// Minimum length requirement (2 characters).
// Only allows alphabets, spaces, and hyphens (e.g., names like "Anne-Marie" or "John Doe").

// EMAIL:
// Follows strict email regex for valid formats (e.g., user@example.com).

// ADDRESS:
// Requires at least 5 characters.
// Allows letters, numbers, spaces, commas, periods, and hyphens (useful for international addresses).

// PHONE NUMBER:
// Accepts only digits (10-15 characters).
// Optionally supports a + sign for country codes.

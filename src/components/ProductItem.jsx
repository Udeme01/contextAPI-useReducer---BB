import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "./store/shopping-cart-context";
import sizeGuideImg from "../assets/sizeGuide.jpg";
import CartModal from "./CartModal";
import { HeaderContext } from "./store/HeaderContext";

// SWIPER JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Close from "./Buttons/Close";
import Checkout from "./Buttons/Checkout";
import ContinueShopping from "./Buttons/ContinueShopping";

const ProductItem = ({ product }) => {
  const { id, description, image, galleryImages, title, price, colors, sizes } =
    product;

  //   initials
  const initialColor = colors[0];
  const initialSize = sizes[0];

  //   State
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);

  //   ref
  const cartModalRef = useRef();

  //    context
  const { addItemToCart, items } = useContext(CartContext);
  const { headerHeight, isMediumScreen } = useContext(HeaderContext);
  console.log(headerHeight);
  console.log(isMediumScreen);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount)); // Ensure quantity doesn't drop below 1
  };

  //   add item to cart func
  const handleAddItemToCart = () => {
    addItemToCart(id, quantity, image, selectedColor, selectedSize);
    cartModalRef.current?.open();
  };

  let modalActions = <Close />;

  if (items.length > 0) {
    modalActions = (
      <>
        <span>
          <ContinueShopping />
          <span className="ml-6">
            <Checkout />
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      <CartModal ref={cartModalRef} title="Your Cart" actions={modalActions} />
      <section className="w-[85%] mx-auto text-center rounded-lg h-full md:flex md:gap-10 xl:max-w-7xl xl:mx-auto">
        <div
          className={`mx-auto flex-1 w-full md:w-1/2 lg:w-1/3 md:sticky md:overflow-hidden`}
          style={
            isMediumScreen
              ? {
                  top: `${headerHeight || "112"}px`,
                  height: `calc(100vh - ${headerHeight || "112"}px)`,
                }
              : {}
          }
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            // pagination={{ clickable: true }}
            // spaceBetween={0}
            slidesPerView={1}
          >
            {galleryImages?.map((galleryImage) => {
              return (
                <SwiperSlide key={galleryImage}>
                  <div className="rounded-lg w-fit h-fit mx-auto">
                    <img
                      src={galleryImage}
                      alt={title}
                      className="mx-auto w-full h-[50vh] object-contain rounded-lg mt-8"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="text-left leading-10 my-6 flex-1 w-full md:w-1/2 lg:w-1/3 overflow-y-auto">
          <h2 className="uppercase tracking-widest leading-8">Fit-In</h2>
          <h1 className="text-left capitalize">{title}</h1>

          {/* price & shipping */}
          <span className="flex flex-col mt-4">
            <span>₦{price.toLocaleString("en-US")}</span>
            <span className="text-xs font-extralight tracking-wider">
              Shipping calculated at checkout
            </span>
          </span>

          {/* colors */}
          <section>
            <h2 className="capitalize tracking-widest mt-4">
              Color: {selectedColor}
            </h2>
            <div className="flex gap-2">
              {/* onClick of btn, bg-color becomes the hovered color while txt-color becomes black-bg */}

              {colors.map((color) => {
                return (
                  <section
                    key={color}
                    className={`border rounded-full p-px ${
                      selectedColor === color && "border-[#000]"
                    }`}
                  >
                    <button
                      className={`border p-6 rounded-full `}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  </section>
                );
              })}
            </div>
          </section>

          {/* size */}
          <section>
            <h2 className="capitalize tracking-widest mt-4">
              Size: {selectedSize}
            </h2>
            <div>
              {/* onClick of btn, bg-color becomes the hovered color while txt-color becomes black-bg */}
              {sizes.map((size, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      selectedSize === size && "bg-[#000] text-[#fff]"
                    } border border-[#464444c4] px-4 py-3 m-3 ml-0 rounded-full text-[#464444] text-sm font-medium hover:border-[#000]`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Quantity */}
          <section>
            <h2 className="capitalize tracking-widest mt-4">Quantity</h2>
            <div className="border border-[#464444] flex items-center justify-around w-40 relative p-2">
              <button
                className="absolute left-0 right-28"
                onClick={() => handleQuantityChange(-1)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{quantity}</span>
              <button
                className="absolute right-0 left-28"
                onClick={() => handleQuantityChange(1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </section>

          {/* add to cart */}
          <section className="border mt-10">
            <button
              onClick={handleAddItemToCart}
              // disabled={disabled}
              // className={`${`
              //   disabled
              //     ? "bg-[#f7d9a1] cursor-not-allowed"
              //     : "bg-[#f4b115] hover:bg-[#f5b744] cursor-pointer"
              // }`}
              className="border border-[#464444] text-[#464444] tracking-widest cursor-pointer w-full p-2"
            >
              Add to cart
            </button>
          </section>

          {/* product description */}
          <p className="leading-normal mt-6">{description}</p>

          {/* size guide chart */}
          <img src={sizeGuideImg} className="mt-8 rounded-sm" />
        </div>
      </section>
    </>
  );
};

export default ProductItem;

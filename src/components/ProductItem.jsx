import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "./store/shopping-cart-context";
import sizeGuideImg from "../assets/sizeGuide.jpg";

// SWIPER JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductItem = ({ product }) => {
  const { id, description, image, title, price } = product;

  const [quantity, setQuantity] = useState(1);

  const { addItemToCart, updateCartItemQuantity } = useContext(CartContext);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateCartItemQuantity(id, newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        updateCartItemQuantity(id, newQuantity);
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  return (
    <section className="w-[85%] mx-auto text-center borde rounded-lg h-full">
      <div className="mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            swiper 1
            <img
              src={image}
              alt={title}
              className="rounded-lg w-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            swiper 2{" "}
            <img
              src={image}
              alt={title}
              className="rounded-lg w-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            swiper 3{" "}
            <img
              src={image}
              alt={title}
              className="rounded-lg w-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            swiper 4{" "}
            <img
              src={image}
              alt={title}
              className="rounded-lg w-full mx-auto"
            />
          </SwiperSlide>
        </Swiper>
        <div className="flex items-center justify-center gap-6 my-6">
          {/* <button className="py-2 px-4">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>1/3</span>
          <button className="py-2 px-4">
            <FontAwesomeIcon icon={faChevronRight} />
          </button> */}
        </div>
      </div>
      <div className="text-left leading-10">
        <h2 className="uppercase tracking-widest leading-8">Fit-In</h2>
        <h1 className="text-left capitalize">{title}</h1>

        {/* price & shipping */}
        <span className="flex flex-col mt-4">
          <span>${price}</span>
          <span className="text-xs font-extralight tracking-wider">
            Shipping calculated at checkout
          </span>
        </span>

        {/* colors */}
        <section>
          <h2 className="capitalize tracking-widest mt-4">Color: black</h2>
          <div className="flex gap-4">
            {/* onClick of btn, bg-color becomes the hovered color while txt-color becomes black-bg */}
            <button className="border border-[#f7d9a1] p-5 rounded-full bg-[#000] hover:border-[#be8c2d]"></button>
            <button className="border border-[#f7d9a1] p-5 rounded-full bg-[#555] hover:border-[#be8c2d]"></button>
            <button className="border border-[#f7d9a1] p-5 rounded-full bg-[#cf2424] hover:border-[#be8c2d]"></button>
          </div>
        </section>

        {/* size */}
        <section>
          <h2 className="capitalize tracking-widest mt-4">Size: XS (4 - 6)</h2>
          <div>
            {/* onClick of btn, bg-color becomes the hovered color while txt-color becomes black-bg */}
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              XS (4 - 6)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              S (8 - 10)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              M (12 - 14)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              L (16 - 18)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              XL (20 - 22)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] text-sm font-medium hover:border-[#be8c2d]">
              2X (24)
            </button>
          </div>
        </section>

        {/* Quantity */}
        <section>
          <h2 className="capitalize tracking-widest mt-4">Quantity</h2>
          <div className="border flex items-center justify-around w-40 relative">
            <button
              className="absolute left-0 right-28"
              onClick={decrementQuantity}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button
              className="absolute right-0 left-28"
              onClick={incrementQuantity}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </section>

        {/* add to cart */}
        <section className="border mt-10">
          <button
            onClick={() => addItemToCart(id)}
            // disabled={disabled}
            // className={`${
            //   disabled
            //     ? "bg-[#f7d9a1] cursor-not-allowed"
            //     : "bg-[#f4b115] hover:bg-[#f5b744] cursor-pointer"
            // }`}
            className="text-[#edbf68] border border-[#f7d9a1] tracking-widest cursor-pointer w-full"
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
  );
};

export default ProductItem;

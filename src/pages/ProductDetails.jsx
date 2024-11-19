import React from "react";
// import { Link, useParams } from "react-router-dom";
import productImage from "../assets/dream-gown.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  // const params = useParams();

  return (
    <section className="w-[85%] mx-auto text-center borde rounded-lg h-full">
      <div className="mx-auto">
        <img src={productImage} alt="dream-gown" className="rounded-lg w-full mx-auto" />
        <div className="flex items-center justify-center gap-6 my-6">
          <button className="py-2 px-4">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>1/3</span>
          <button className="py-2 px-4">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className="text-left leading-10">
        <h2 className="uppercase tracking-widest leading-3">Fit-In</h2>
        <h1 className="text-left capitalize">Dream Gown</h1>

        {/* price & shipping */}
        <span className="flex flex-col mt-4">
          <span>₦1,000,000</span>
          <span className="text-xs font-extralight tracking-wider">
            Shipping calculated at checkout
          </span>
        </span>

        {/* size */}
        <section>
          <h2 className="capitalize tracking-widest mt-4">Size: XS (4 - 6)</h2>
          <div>
            {/* onClick of btn, bg-color becomes the hovered color while txt-color becomes black-bg */}
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              XS (4 - 6)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              S (8 - 10)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              M (12 - 14)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              L (16 - 18)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              XL (20 - 22)
            </button>
            <button className="border border-[#f7d9a1] p-2 m-1 ml-0 rounded-md bg-[#000] text-[#edbf68] font-medium hover:border-[#be8c2d]">
              2X (24)
            </button>
          </div>
        </section>

        {/* Quantity */}
        <section>
          <h2 className="capitalize tracking-widest mt-4">Quantity</h2>
          <div className="border flex items-center justify-around w-40 relative">
            <button className="absolute left-0 right-28">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>1</span>
            <button className="absolute right-0 left-28">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </section>

        {/* add to cart */}
        <section className="border mt-10">
          <button
            onClick={() => addItemToCart(sys.id)}
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
      </div>
    </section>
  );
};

export default ProductDetails;

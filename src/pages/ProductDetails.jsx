import React from "react";
// import { Link, useParams } from "react-router-dom";
import productImage from "../assets/dream-gown.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  // const params = useParams();

  return (
    <section className="w-[85%] mx-auto text-center borde rounded-lg h-full">
      <div>
        <img src={productImage} alt="dream-gown" className="rounded-lg" />
        <div className="flex items-center justify-center gap-8 my-6">
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>1/3</span>
          <FontAwesomeIcon icon={faChevronRight} />
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
        <h2 className="capitalize tracking-widest mt-4">Size: XS (4 - 6)</h2>
        <div className="border">
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            XS (4 - 6)
          </button>
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            S (8 - 10)
          </button>
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            M (12 - 14)
          </button>
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            L (16 - 18)
          </button>
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            XL (20 - 22)
          </button>
          <button className="border p-2 rounded-md bg-[#000] text-[#edbf68] font-medium">
            2X (24 - 26)
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

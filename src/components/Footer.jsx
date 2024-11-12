// footer....
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#5f4e33]">
      <section className="flex flex-col py-8 w-[85%] mx-auto xl:max-w-7xl xl:mx-auto">
        <h1>fit-in</h1>
        <section className="grid sm:grid-cols-2">
          <section className="my-6 sm:my-0">
            <h4 className="text-[#fbd392] my-6">Information</h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="#" className="text-sm leading-6">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Size + Fit Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6">
                  Terms of Service
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h4 className="text-[#fbd392] my-6">Contact Us</h4>
            <div className="text-sm">
              <p>
                3 Bello Cresent
                <br />
                Ilupeju, Lagos 102215
                <br />
                Lagos, Nigeria
              </p>
              <p className="mt-6">
                Phone:{" "}
                <a
                  href="tel:+234 805 574 2292"
                  title="tel:+234 805 574 2292"
                  className="underline underline-offset-4"
                >
                  +234 805 574 2292
                </a>
              </p>
            </div>
          </section>
        </section>
        <section className="flex justify-between items-center border-t border-[#f3e7d4]-800 mt-16 pt-8 sm:mt-20">
          <p className="text-sm leading-5">
            &copy; 2024, Fit-In. All rights reserved.
          </p>
          <p className="text-center text-2xl text-white flex gap-4 items-center justify-center">
            <FontAwesomeIcon
              icon={faInstagram}
              className="p-1 rounded-md cursor-pointer"
              title="instagram"
            />
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="p-1 rounded-md cursor-pointer"
              title="whatsapp"
            />
          </p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;

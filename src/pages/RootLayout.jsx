import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const RootLayout = ({ query, setQuery }) => {
  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className="hero">
        <h1>Fit-In</h1>
        <p className="px-4">
          Carefully crafted to help you be your most Confident and Stylish self.
        </p>
        <h2>
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faWhatsapp} />
        </h2>
      </main>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

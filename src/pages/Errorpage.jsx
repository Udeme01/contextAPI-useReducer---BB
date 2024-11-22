import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Errorpage = () => {
  const error = useRouteError();
  console.log(error);

  let title = "An error occured";
  let message = "Network Error";
  let statusText = "";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource or page";
  }

  return (
    <>
    <Header />
      <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="capitalize">{title}</h1>
        <p>
          {/* <i>{error.statusText || error.message}</i> */}
          <i>{message}</i>
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Errorpage;

// check status for 'Network Error' message && others too.

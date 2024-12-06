import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Errorpage = () => {
  const error = useRouteError();

  let title = "An error occured";
  let message = "Something went wrong";

  if (error) {
    switch (error.status) {
      case 500:
        title = "Internal Server Error";
        break;
      case 404:
        title = "Page Not Found";
        break;
      case 401:
        title = "Unauthorized";
        break;
      default:
        title = `Error ${error.status}`;
    }

    try {
      message = JSON.parse(error.data)?.message || message;
    } catch {
      message = error.statusText || message;
    }
  }

  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="capitalize">{title}</h1>
        <p>
          <i>{message}</i>
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Errorpage;

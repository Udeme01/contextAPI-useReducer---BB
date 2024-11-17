import React from "react";
import { useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1>Error!</h1>
        <h2>use just one error component for all kinds of errors!</h2>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </section>
    </>
  );
};

export default Errorpage;

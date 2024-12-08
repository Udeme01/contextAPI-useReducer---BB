import React from "react";
import { OrbitProgress } from "react-loading-indicators";

const Loader = () => {
  return (
    <section className="loader-overlay">
      <p className="loader" aria-live="polite">
        <OrbitProgress
          variant="spokes"
          color="#ff0080"
          size="large"
          speedPlus="2"
          easing="linear"
        />
      </p>
    </section>
  );
};

export default Loader;

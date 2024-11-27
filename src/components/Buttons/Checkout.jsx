import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleChecout = () => {
    navigate("/checkout");
  };

  return <button onClick={handleChecout}>checkout</button>;
};

export default Checkout;

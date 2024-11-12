import React from "react";

const Checkout = () => {
    
  const handleCheckout = (e) => {
    e.preventDefault();
    alert("checkingOut");
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default Checkout;

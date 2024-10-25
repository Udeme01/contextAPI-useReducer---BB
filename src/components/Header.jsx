import { useRef, useContext, useState } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Input from "./inputs/Input.jsx";

export default function Header() {
  const [showInput, setShowInput] = useState(false);

  const handleSearchIconClick = () => {
    setShowInput((prevState) => !prevState);
  };

  const { items } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length; // displays the number of items(quantity) of/that's (in) the cart

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        {showInput ? (
          <span className="searchWrapper">
            <Input type="text" placeholder="Search for a product" />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              color="#f3e7d4F"
              className="searchIcon"
            />
          </span>
        ) : (
          <>
            <div id="main-title">
              <img src="logo.png" alt="Elegant model" />
              {/* <h1>Olu</h1> */}
            </div>
            <p>
              <button onClick={handleSearchIconClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </p>
            <p>
              <button onClick={handleOpenCartClick}>
                <FontAwesomeIcon icon={faBagShopping} size="lg" />
                <span>{cartQuantity}</span>
              </button>
            </p>
          </>
        )}
      </header>
    </>
  );
}

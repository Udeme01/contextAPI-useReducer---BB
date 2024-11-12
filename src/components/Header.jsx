import { useRef, useContext, useState } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Input from "./inputs/Input.jsx";
import Checkout from "./Buttons/Checkout.jsx";
import Close from "./Buttons/Close.jsx";

export default function Header() {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchIconClick = () => {
    setShowInput((prevState) => !prevState);
  };

  const { items, searchItem } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length; // displays the number of items(quantity) of/that's (in) the cart

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <Close />;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <Close />
        <Checkout />
      </>
    );
  }
  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header
        id="main-header"
        className="flex items-center justify-between w-[85%] mx-auto xl:max-w-7xl xl:mx-auto"
      >
        {showInput ? (
          <span className="searchWrapper border-2">
            <Input type="text" placeholder="Search for a product" />
            <button className="searchIcon">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="lg"
                color="#f3e7d4F"
                className="borde"
              />
            </button>
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

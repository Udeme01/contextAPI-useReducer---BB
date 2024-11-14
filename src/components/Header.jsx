import { useRef, useContext, useState } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";

import Input from "./inputs/Input.jsx";
import Checkout from "./Buttons/Checkout.jsx";
import Close from "./Buttons/Close.jsx";

export default function Header({ query, setQuery }) {
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput((prevState) => !prevState);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const { items, searchItem } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length; // displays the number of items(quantity) of/that's (in) the cart

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleClearInput() {
    setQuery("");
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
            <Input
              type="text"
              placeholder="Search for a product"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              clearInput={handleClearInput}
            />

            <button className="searchIcon">
              <FontAwesomeIcon
                onClick={() => searchItem(query)}
                icon={faMagnifyingGlass}
                size="lg"
                color="#f3e7d4F"
              />
              <p
                onClick={handleCloseInput}
                className="absolute -right-1 -bottom-[60px] left-0 text-[#735932] bg-[#f3e7d4] top-[60px] text-center leading-loose h-fit rounded-xs font-medium"
              >
                close
              </p>
            </button>
          </span>
        ) : (
          <>
            <div id="main-title">
              <img src="logo.png" alt="Elegant model" />
              {/* <h1>Olu</h1> */}
            </div>
            <p>
              <button onClick={handleShowInput}>
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

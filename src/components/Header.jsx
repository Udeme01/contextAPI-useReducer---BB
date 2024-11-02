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

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  // const handleSearchItem = (item) => {
  //   console.log("initial search", search);
  //   console.log("initial item", item);
  //   setTimeout(() => {
  //     setSearch(item);
  //     console.log("2secs item...", item);
  //     console.log("2secs search...", search);
  //   }, 3000);

  // };
  // const handleSearchItem = () => {
  //   console.log("initial search", search);
  // };

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header
        id="main-header"
        className="flex items-center justify-between w-full"
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

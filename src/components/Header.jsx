import { useRef, useContext, useState } from "react";
import CartModal from "./CartModal.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Input from "./inputs/Input.jsx";
import Checkout from "./Buttons/Checkout.jsx";
import Close from "./Buttons/Close.jsx";
import { Link } from "react-router-dom";
import logo from "/logo.png";

export default function Header() {
  const [query, setQuery] = useState("");
  // const [showInput, setShowInput] = useState(false);

  // const handleShowInput = () => {
  //   setShowInput((prevState) => !prevState);
  // };

  // const handleCloseInput = () => {
  //   setShowInput(false);
  //   setQuery("");
  //   searchItem("");
  // };

  const { items, searchItem } = useContext(CartContext);
  const modal = useRef();
  const inputRef = useRef();

  const cartQuantity = items.length; // displays the number of items(quantity) of/that's (in) the cart

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleClearInput() {
    setQuery("");
    inputRef.current?.focus();
    searchItem("");
  }

  // Function to handle the search action
  const handleSearch = () => {
    if (query.trim() !== "") {
      searchItem(query);
    }
    // console.log(query);
  };

  // Handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
        {/* {showInput ? (
          <span className="searchWrapper">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for a product"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              clearInput={handleClearInput}
            />

            <button className="searchIcon">
              <FontAwesomeIcon
                onClick={handleSearch}
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
        ) : ( */}
        <>
          <Link to={`/`} id="main-title">
            <img src={logo} alt="Elegant model" />
            <h1 className="hidden md:block">fit-in</h1>
          </Link>
          {/* work on search feature later... */}
          {/* <p>
              <button onClick={handleShowInput}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </p> */}
          <p>
            <button onClick={handleOpenCartClick}>
              <FontAwesomeIcon icon={faBagShopping} title="cart" size="lg" />
              <span title="cart quantity">{cartQuantity}</span>
            </button>
          </p>
        </>
        {/* // )}  */}
      </header>
      <main className="hero">
        <h1 className="md:hidden font-medium">Fit-In</h1>
        <p className="px-4 text-[#464444]">
          Every fit-in creation is a labor of love, crafting confidence-boosting
          attire for him and her.
        </p>
        <h2 className="flex items-center justify-center gap-2">
          <Link
            to="https://www.instagram.com/fitin_mycloset/profilecard/?igsh=a3c4dG1rbXM1NzR2"
            target="_blank"
          >
            <FontAwesomeIcon
              title="instagram"
              icon={faInstagram}
              className="bg-[#00000015] rounded-full p-3 hover:bg-[#0000000a]"
            />
          </Link>
          <Link to="https://wa.me/message/2WFNIBDVGAFMP1" target="_blank">
            <FontAwesomeIcon
              title="whatsapp"
              icon={faWhatsapp}
              className="bg-[#00000015] rounded-full p-3 hover:bg-[#0000000a]"
            />
          </Link>
        </h2>
      </main>
    </>
  );
}

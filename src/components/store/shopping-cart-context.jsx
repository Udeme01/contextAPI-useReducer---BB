import { createContext, useReducer, useEffect } from "react";
import { DUMMY_PRODUCTS } from "../../dummy-products";
// import Product from "../Product";

export const CartContext = createContext({
  items: [],
  searchResults: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  searchItem: () => {},
});

// reducer function...
const shoppingCartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items]; // COPY THE PREVIOUS ITEMS FROM THE CART. i.e, CREATES A COPY OF THE CURRENT STATE'S ITEM ARRAY.

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex]; // SEARCHES FOR AN EXISTING ITEM IN THE CART BASED ON THE ITEM ID.

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      }; // the quantity property is defined at the moment it's being used.
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );

      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      }); // quantity here is explicitly defined when adding a new item. i.e. When adding a new item to the cart, the quantity is explicitly stated as part of the new item's properties. In this case, the quantity is set to 1, indicating that one unit of the product is being added to the cart.
    }

    // ADD_TO_CART_STORAGE
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex], // spreads all properties of the item at updatedItemIndex into a new object...
    }; // using the spread operator to create a new object... so this accesses the item in updatedItemIndex

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    // UPDATE_CART_STORAGE
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "SEARCH_ITEM") {
    if (action.payload.trim() === "") {
      return {
        ...state,
        searchResults: DUMMY_PRODUCTS,
      };
    }

    const searchResults = DUMMY_PRODUCTS.filter((item) =>
      item.title.toLowerCase().includes(action.payload.toLowerCase())
    );

    return {
      ...state,
      searchResults,
    };
    // console.log("searching for product...", state.items);
  }

  if (action.type === "SET_ITEMS") {
    return {
      ...state,
      items: action.payload,
    };
  }

  return state;
};

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
      searchResults: [],
    }
  );

  // LOAD CART ITEMS FROM LOCAL STORAGE ON INITIAL RENDER
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      shoppingCartDispatch({ type: "SET_ITEMS", payload: savedCartItems });
    }
  }, []);

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  function handleSearchItem(productName) {
    shoppingCartDispatch({
      type: "SEARCH_ITEM",
      payload: productName,
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    searchResults: shoppingCartState.searchResults,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    searchItem: handleSearchItem,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

// the context object values here aren't getting used in any way, they're just for auto-completion.

// 1. Existing vs. New Items:
// For existing items, quantity is derived from the existing item.
// For new items, quantity is explicitly set to 1.

// 2. Creation Time:
// For existing items, quantity is accessed from the existing item.
// For new items, quantity is defined right at the moment the new item is created.

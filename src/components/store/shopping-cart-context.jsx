import { createContext, useReducer, useEffect } from "react";
import { fetchAllEntries } from "../contentful/https";

export const CartContext = createContext({
  items: [],
  products: [],
  searchResults: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  searchItem: () => {},
});

// reducer function...
const shoppingCartReducer = (state, action) => {
  if (action.type === "SET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items]; // COPY THE PREVIOUS ITEMS FROM THE CART. i.e, CREATES A COPY OF THE CURRENT STATE'S ITEM ARRAY.

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex]; // SEARCHES FOR AN EXISTING ITEM IN THE CART BASED ON THE ITEM ID.

    if (existingCartItem) {
      // If the item already exists, update its quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.payload.quantity,
      }; // the quantity property is defined at the moment it's being used.
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If the item does not exist, add it to the cart
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );

      updatedItems.push({
        id: action.payload.id,
        name: product.title,
        price: product.price,
        quantity: action.payload.quantity,
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
        searchResults: state.products,
      };
    }

    const searchResults = state.products.filter((item) =>
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
      products: [],
      searchResults: [],
    }
  );

  // FETCH PRODUCTS FROM CONTENTFUL && LOAD CART ITEMS FROM LOCAL STORAGE ON INITIAL RENDER
  useEffect(() => {
    const fetchProducts = async () => {
      const entries = await fetchAllEntries();
      const products = entries.map((entry) => {
        const { id, title, description, price, image } = entry;
        return {
          id,
          title,
          description,
          price,
          image,
        };
      });
      shoppingCartDispatch({ type: "SET_PRODUCTS", payload: products });
    };

    fetchProducts();

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      shoppingCartDispatch({ type: "SET_ITEMS", payload: savedCartItems });
    }
  }, []);

  function handleAddItemToCart(id, quantity) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        quantity,
      },
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
    products: shoppingCartState.products,
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

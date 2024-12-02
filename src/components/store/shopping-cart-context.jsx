import { createContext, useReducer, useEffect } from "react";
import { fetchAllEntries } from "../contentful/https";

export const CartContext = createContext({
  items: [],
  products: [],
  searchResults: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  searchItem: () => {},
  clearItem: () => {},
  clearAllItems: () => {},
  message: "",
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
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) =>
        cartItem.id === action.payload.id &&
        cartItem.selectedColor === action.payload.selectedColor &&
        cartItem.selectedSize === action.payload.selectedSize
    );

    const existingCartItem = updatedItems[existingCartItemIndex]; // SEARCHES FOR AN EXISTING ITEM IN THE CART BASED ON THE ITEM ID, COLOR & SIZE.

    if (existingCartItem) {
      // If the item already exists, update its quantity
      // const updatedItem = {
      //   ...existingCartItem,
      //   quantity: existingCartItem.quantity + action.payload.quantity,
      // };
      // updatedItems[existingCartItemIndex] = updatedItem;
      return {
        ...state,
        message: "This item is already in your cart.",
      };
    } else {
      // If the item does not exist, add it to the cart
      const product = state.products.find((product) => {
        return product.id === action.payload.id;
      });

      updatedItems.push({
        id: action.payload.id,
        name: product.title,
        price: product.price,
        image: action.payload.image,
        quantity: action.payload.quantity,
        selectedColor: action.payload.selectedColor,
        selectedSize: action.payload.selectedSize,
      });
    }

    // ADD_TO_CART_STORAGE
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
      message: "",
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) =>
        `${item.id}-${item.selectedSize}-${item.selectedColor}` ===
        action.payload.productId
    );

    // item.id === action.payload.productId

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

  if (action.type === "CLEAR_ITEM") {
    const { productId } = action.payload;

    const updatedItems = state.items.filter(
      (item) =>
        `${item.id}-${item.selectedSize}-${item.selectedColor}` !== productId
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
      // message: `Item ${productId} removed from cart.`,
    };
  }

  if (action.type === "CLEAR_ALL_ITEMS") {
    localStorage.removeItem("cartItems");
    return {
      ...state,
      items: [],
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
      message: "",
    }
  );

  // FETCH PRODUCTS FROM CONTENTFUL && LOAD CART ITEMS FROM LOCAL STORAGE ON INITIAL RENDER
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const entries = await fetchAllEntries();
        const products = entries.map((entry) => {
          const { id, title, description, price, image } = entry;
          // console.log(entry);
          return {
            id,
            title,
            description,
            price,
            image,
          };
        });
        shoppingCartDispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      shoppingCartDispatch({ type: "SET_ITEMS", payload: savedCartItems });
    }
  }, []); // handle error here...

  function handleAddItemToCart(
    id,
    quantity,
    image,
    selectedColor,
    selectedSize
  ) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: { id, quantity, image, selectedColor, selectedSize },
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

  function handleClearItem(productId) {
    shoppingCartDispatch({
      type: "CLEAR_ITEM",
      payload: { productId },
    });
  }

  function handleClearAllItems() {
    shoppingCartDispatch({
      type: "CLEAR_ALL_ITEMS",
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    products: shoppingCartState.products,
    searchResults: shoppingCartState.searchResults,
    message: shoppingCartState.message,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    searchItem: handleSearchItem,
    clearItem: handleClearItem,
    clearAllItems: handleClearAllItems,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

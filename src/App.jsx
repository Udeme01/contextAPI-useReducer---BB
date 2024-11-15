import { useState } from "react";
import CartContextProvider from "./components/store/shopping-cart-context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Errorpage from "./pages/Errorpage.jsx";

function App() {
  const [query, setQuery] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout query={query} setQuery={setQuery} />,
      errorElement: <Errorpage />,
      children: [{ index: true, element: <Homepage /> }],
    },
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  ]);

  return (
    <CartContextProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </CartContextProvider>
  );
}

export default App;

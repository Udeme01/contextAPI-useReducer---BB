import CartContextProvider from "./components/store/shopping-cart-context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Errorpage from "./pages/Errorpage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Errorpage />,
      children: [
        { index: true, element: <Homepage /> },
        { path: ":productId", element: <ProductDetails /> },
      ],
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

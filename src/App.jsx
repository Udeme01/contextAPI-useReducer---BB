import CartContextProvider from "./components/store/shopping-cart-context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Errorpage from "./pages/Errorpage.jsx";
import ProductDetails, {
  loader as productDetailLoader,
} from "./pages/ProductDetails.jsx";
import Shop, { loader as productsLoader } from "./components/Shop.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Errorpage />,
      children: [
        {
          index: true,
          element: <Shop />,
          loader: productsLoader,
        },
        {
          path: ":productId",
          element: <ProductDetails />,
          loader: productDetailLoader,
        },
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
      >
        <ScrollToTop />
      </RouterProvider>
    </CartContextProvider>
  );
}

export default App;

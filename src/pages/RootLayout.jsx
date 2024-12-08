import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Loader from "../components/Loaders/Loader";

const RootLayout = () => {
  const navigation = useNavigation();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <main>
        {navigation.state === "loading" && <Loader />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

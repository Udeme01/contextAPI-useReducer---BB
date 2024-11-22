import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
  // const navigation = useNavigation();

  // navigation.state === "loading";
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

import { createContext, useEffect, useState, useRef } from "react";

export const HeaderContext = createContext({
  headerHeight: 0,
  headerRef: null,
  isMediumScreen: false,
});

export const HeaderProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef?.current) {
        console.log(headerRef?.current?.offsetHeight);
        setHeaderHeight(headerRef?.current?.offsetHeight);
      }
      setIsMediumScreen(window.innerWidth >= 768); // Tailwind's `md` breakpoint
    };
    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const headerContextValue = {
    headerHeight: headerHeight,
    headerRef: headerRef,
    isMediumScreen: isMediumScreen,
  };

  return (
    <HeaderContext.Provider value={headerContextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

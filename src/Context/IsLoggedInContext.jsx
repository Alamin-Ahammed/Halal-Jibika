import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

const isLoggedInContext = createContext();

export const IsLoggedInContext = ({ children }) => {
  const cookies = new Cookies();
  const [isSingedIn, setIsSingedIn] = useState(
    cookies.get("authInfo") ? true : false
  );

  return (
    <isLoggedInContext.Provider value={{ isSingedIn, setIsSingedIn }}>
      {children}
    </isLoggedInContext.Provider>
  );
};

export const useIsLoggedInContext = () => {
  const { isSingedIn, setIsSingedIn } = useContext(isLoggedInContext);
  return { isSingedIn, setIsSingedIn };
};

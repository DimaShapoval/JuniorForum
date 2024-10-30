"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { HeaderContextType } from "@/type";

export const HeaderContext = createContext<HeaderContextType>({
  //create context
  userLogined: "",
  setUserLogined: (name: string) => {},
});
export default function HeaderProvider({ children }: any) {
  //create provider for context
  const [userLogined, setUserLogined] = useState<string>(""); // create state for context
  useEffect(() => {
    if (localStorage.userName) {
      setUserLogined(localStorage.userName);
    }
  }, []);
  return (
    <HeaderContext.Provider value={{ userLogined, setUserLogined }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};

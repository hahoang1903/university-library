"use client";

import type { ReactNode, SetStateAction, Dispatch } from "react";
import { createContext, useContext, useState } from "react";

type LogoutClickedContextType = {
  isLogoutClicked: boolean;
  setIsLogoutClicked: Dispatch<SetStateAction<boolean>>;
};

const LogoutClickedContext = createContext<LogoutClickedContextType>({
  isLogoutClicked: false,
  setIsLogoutClicked: () => {},
});

export const LogoutClickedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);

  return (
    <LogoutClickedContext.Provider
      value={{ isLogoutClicked, setIsLogoutClicked }}
    >
      {children}
    </LogoutClickedContext.Provider>
  );
};

export const useLogoutClicked = (): LogoutClickedContextType => {
  const context = useContext(LogoutClickedContext);
  if (!context) {
    throw new Error(
      "useLogoutClicked must be used within a LogoutClickedProvider"
    );
  }
  return context;
};

import { createContext, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PocketBase from "pocketbase";

const BASE_URL = "http://127.0.0.1:8090";
const pb = new PocketBase(BASE_URL);

export const PocketBaseContext = createContext<{ pb: PocketBase }>({ pb });

export const PocketBaseProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};

export const usePocketBase = () => useContext(PocketBaseContext);

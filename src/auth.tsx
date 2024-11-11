import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import { usePocketBase } from "./pocketbase";
import { RecordAuthResponse, RecordModel } from "pocketbase";

const fiveMinutesInMs = 5 * 60 * 1000;
const twoMinutesInMs = 2 * 60 * 1000;

export const AuthContext = createContext<{
  user: Record<string, string> | null;
  token: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<RecordAuthResponse<RecordModel>>;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: async (email, password) => null as any,
  logout: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { pb } = usePocketBase();

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp!;
    const expirationWithBuffer =
      (new Date().getTime() + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  const login = useCallback(async (email: string, password: string) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const AuthRequired: React.FC<{ signInRoute?: string }> = ({
  signInRoute,
}) => {
  const model = useAuth();
  const location = useLocation();

  if (!model?.user) {
    return (
      <Navigate
        to={{ pathname: signInRoute ?? "/sign-in" }}
        state={{ location }}
        replace
      />
    );
  }

  return <Outlet />;
};

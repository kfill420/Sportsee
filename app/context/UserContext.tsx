import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiService } from "~/services/ApiService";
import type { UserProfile } from "~/types/user";
import { getToken, removeToken, setToken } from "~/utils/auth";

type UserContextValue = {
  token: string | undefined;
  user: UserProfile | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string>();
  const [user, setUser] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(undefined);
    setUser(undefined);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { token } = await ApiService.login(username, password);
    const profile = await ApiService.getUserInfo(token);
    setToken(token);
    setTokenState(token);
    setUser(profile);
  }, []);

  useEffect(() => {
    const storedToken = getToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setTokenState(storedToken);
    ApiService.getUserInfo(storedToken)
      .then(setUser)
      .catch(logout)
      .finally(() => setIsLoading(false));
  }, [logout]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated: !!token, isLoading, login, logout }),
    [token, user, isLoading, login, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
}

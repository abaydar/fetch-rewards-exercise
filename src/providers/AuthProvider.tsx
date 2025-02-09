import { createContext, ReactNode, SetStateAction, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
  }

const defaultSetIsAuthenticated = (() => {}) as React.Dispatch<SetStateAction<boolean | null>>;

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: defaultSetIsAuthenticated
})

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
);
};
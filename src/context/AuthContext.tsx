import { createContext } from "react";
import { Token } from "@/types";

export interface AuthContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  login: (username: string, password: string) => Promise<Token>;
  logout: () => void;
  formUsername: string;
  setFormUsername: React.Dispatch<React.SetStateAction<string>>;
  Password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  usernameError: string;
  setUsernameError: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: "",
  setUser: () => {},
  token: "",
  setToken: () => {},
  login: async () => ({}), //fallback if any error happens this function will returns an empty array
  logout: () => {},
  formUsername: "",
  setFormUsername: () => {},
  Password: "",
  setPassword: () => {},
  error: "",
  setError: () => {},
  usernameError: "",
  setUsernameError: () => {},
  passwordError: "",
  setPasswordError: () => {},
  showPassword: false,
  setShowPassword: () => {},
  loading: false,
  setLoading: () => {},
});

import { createContext } from "react";
import { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;

  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;

  logout: () => Promise<void>;

  formEmail: string;
  setFormEmail: React.Dispatch<React.SetStateAction<string>>;

  password: string;
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},

  token: "",
  setToken: () => {},

  login: async () => {
    throw new Error("AuthContext not initialized");
  },

  register: async () => {
    throw new Error("AuthContext not initialized");
  },

  logout: async () => {},

  formEmail: "",
  setFormEmail: () => {},

  password: "",
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

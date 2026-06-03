import { createContext } from "react";

export type LoginContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  login: () => Promise<any>;
};

export const LoginContext = createContext<LoginContextType>({
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},
  login: async () => ({}), //fallback if any error happens this function will returns an empty array
});

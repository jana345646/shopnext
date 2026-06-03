"use client";

import { LoginContext } from "./LoginContext";
import { useState } from "react";
import { fetchToken } from "@/lib/api";

function LoginProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const data = await fetchToken(username.trim(), password.trim());

    return data;
  };

  return (
    <LoginContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        login,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;

"use client";

import { AuthContext } from "./AuthContext";
import { useState, useEffect, useContext } from "react";
import { fetchToken } from "@/lib/api";
import { useRouter } from "next/navigation";
import { CartContext } from "./CartContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const cartData = useContext(CartContext);
  const dispatch = cartData?.dispatch;

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [Password, setPassword] = useState("");

  const [formUsername, setFormUsername] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // load from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("shopnext_token");
    const savedUser = localStorage.getItem("shopnext_user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const login = async (username: string, password: string) => {
    const result = await fetchToken(username.trim(), password.trim());

    if (result?.data?.token) {
      setUser(username);
      setToken(result.data.token);

      localStorage.setItem("shopnext_token", result.data.token);
      localStorage.setItem("shopnext_user", username);
    }

    return result;
  };

  const logout = () => {
    setUser("");
    setToken("");
    setFormUsername("");
    setPassword("");

    if (dispatch) {
      dispatch({ type: "CLEAR_CART" });
    }

    // مسح الـ localStorage
    localStorage.removeItem("shopnext_token");
    localStorage.removeItem("shopnext_user");
    localStorage.removeItem("shopnext_cart");

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        user,
        setUser,
        formUsername,
        setFormUsername,
        Password,
        setPassword,
        usernameError,
        setUsernameError,
        passwordError,
        setPasswordError,
        showPassword,
        setShowPassword,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

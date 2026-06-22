"use client";

import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword, // a function responsible for login
  signOut, // a function responsible for logout
  onAuthStateChanged, // a function responsible to check if there is a user in every change or not
  createUserWithEmailAndPassword, // a function responsible for sign up
  User, // type for the data of each user
} from "firebase/auth";
import { auth } from "@/firebase"; // we call the variable that holds the firebase authentictaion (login / logout / register)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
        // 👇 ضيفي السطر ده هنا عشان يعلم إن الـ user جوه الأبلكيشن
        localStorage.setItem("shopnext_logged_in", "true");
      } else {
        setUser(null);
        setToken("");
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Register
  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      setToken("");

      // 👇 ضيفي السطر ده هنا عشان نمسح العلامة تماماً وقت الـ logout صراحةً
      localStorage.removeItem("shopnext_logged_in");

      setFormEmail("");
      setPassword("");
      setUsernameError("");
      setPasswordError("");
      setError("");

      router.replace("/");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,

        register,
        login,
        logout,

        formEmail,
        setFormEmail,

        password,
        setPassword,

        usernameError,
        setUsernameError,

        passwordError,
        setPasswordError,

        error,
        setError,

        showPassword,
        setShowPassword,

        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

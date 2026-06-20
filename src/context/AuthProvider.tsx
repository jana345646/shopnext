"use client";

import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "@/firebase";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // 🔐 Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  // 🔐 UI states
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // load from localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
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
      // 1️⃣ تسجيل الخروج من Firebase
      await signOut(auth);

      // 2️⃣ تنظيف بيانات الفورم والأخطاء
      setFormEmail("");
      setPassword("");
      setUsernameError("");
      setPasswordError("");
      setError("");

      // 3️⃣ تمسح الـ Cart والـ Favorites من الـ LocalStorage (تأكد من الأسماء اللي مسميها في الـ CartContext)
      localStorage.removeItem("cart");
      localStorage.removeItem("favorites");
      // لو عايز تمسح أي حاجة تانية متسيفة في الكاش، تقدر تستخدم: localStorage.clear();

      console.log("🔥 AFTER SIGNOUT:", auth.currentUser);

      // 4️⃣ توجهه لصفحة الـ login
      router.replace("/login");

      // 5️⃣ السحر هنا: بيعمل ريفريش كامل للصفحة، فكل الـ Contexts التانية (زي CartContext)
      // هترجع للـ Initial State (الفاضية) كأن الأبليكيشن لسه بيفتح لأول مرة
      window.location.reload();
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

export default AuthProvider;

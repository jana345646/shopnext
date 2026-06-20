"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = useContext(AuthContext);

  if (!authData) return null;

  const { token } = authData;

  const router = useRouter(); // we call the userouter here as it returns an object with different properties releated to the navigation process

  useEffect(() => {
    if (!token) {
      router.push("/login?next=/cart"); //open login then after user logged in navigatge to the cart page (? means that we will send additional data with the url)
    }
  }, [token, router]);

  if (!token) return null; // to prevent the cart to appear if there is no token

  return children; // to display the children
}

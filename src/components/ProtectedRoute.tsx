"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  next: string; // the page we want to navigate to after the user logs in
}

export default function ProtectedRoute({
  children,
  next,
}: ProtectedRouteProps) {
  const authData = useContext(AuthContext);

  if (!authData) return null;

  const { token } = authData;

  const router = useRouter(); // we call the useRouter here as it returns an object with different properties related to the navigation process

  useEffect(() => {
    if (!token) {
      router.push(`/login?next=${next}`); // open login then after user logged in navigate to the page passed in the next prop (? means that we will send additional data with the url)
    }
  }, [token, router, next]);

  if (!token) return null; // to prevent the protected page from appearing if there is no token

  return children; // to display the children
}

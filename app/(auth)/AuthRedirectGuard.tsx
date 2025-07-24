"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

export default function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isUserAuthenticated = await isAuthenticated();
      if (isUserAuthenticated) {
        router.push("/");
      } else {
        setLoading(false); // only render children if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return null; // Or render a spinner

  return <>{children}</>;
}

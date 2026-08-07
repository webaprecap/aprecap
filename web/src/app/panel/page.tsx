"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function PanelRouter() {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!userData) {
        router.push("/login");
      } else if (userData.rol === "admin" || userData.rol === "superadmin") {
        router.push("/panel/admin");
      } else {
        router.push("/panel");
      }
    }
  }, [userData, loading, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-gray-500">Redirigiendo…</p>
    </div>
  );
}

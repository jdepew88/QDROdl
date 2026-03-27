"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
  label?: string;
};

export default function LogoutButton({
  className = "",
  label = "Logout",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className={className}
      aria-label="Log out"
    >
      {loading ? "Logging out..." : label}
    </button>
  );
}


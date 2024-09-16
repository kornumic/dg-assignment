"use client";

import { CiLogout } from "react-icons/ci";
import { logout } from "@/server/actions/user";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      location.reload();
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div
      className="cursor-pointer hover:text-sky-300 transition-all"
      onClick={handleLogout}
    >
      <CiLogout className="w-8 h-8" />
    </div>
  );
};

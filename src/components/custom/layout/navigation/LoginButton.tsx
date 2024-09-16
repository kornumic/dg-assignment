"use client";

import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();

  const loginHandler = () => {
    router.push("/login");
  };
  return (
    <div
      className="cursor-pointer hover:text-sky-300 transition-all"
      onClick={loginHandler}
    >
      <CiLogin className="w-8 h-8" />
    </div>
  );
};

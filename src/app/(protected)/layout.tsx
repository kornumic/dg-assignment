import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default ProtectedLayout;

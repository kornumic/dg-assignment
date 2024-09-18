import { CiCircleCheck } from "react-icons/ci";
import { NavigationItem } from "@/components/custom/layout/navigation/NavigationItem";
import { LoginButton } from "@/components/custom/layout/navigation/LoginButton";
import { LogoutButton } from "@/components/custom/layout/navigation/LogoutButton";
import { auth } from "@/lib/next-auth/auth";
import { useSession } from "next-auth/react";

export const MainNavigation: React.FC = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="flex flex-row items-center bg-sky-600 text-primary-foreground px-4 py-4 space-x-8">
        <div className="flex flex-row items-center space-x-2">
          <CiCircleCheck className="w-8 h-8" />
          <h1 className="text-2xl">Tasks</h1>
        </div>
        <div className="flex flex-row w-full justify-between">
          <ul className="flex flex-row px-4 space-x-4 items-center">
            <NavigationItem target={"/home"} base={"/home"} title={"Home"} />
            {!!session && (
              <NavigationItem
                target={"/tasks?sort=desc"}
                base={"/tasks"}
                title={"My Tasks"}
              />
            )}
          </ul>
          <div className="flex flex-row w-fit items-center space-x-4">
            {!!session && session.user && (
              <p className="text-lg h-fit text-center">{session.user.email}</p>
            )}
            {!session && <LoginButton />}
            {!!session && <LogoutButton />}
          </div>
        </div>
      </nav>
    </header>
  );
};

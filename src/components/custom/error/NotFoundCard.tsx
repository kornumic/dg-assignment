"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { GoHome } from "react-icons/go";

export const NotFoundCard = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <Card className="flex w-fit px-16 py-4">
      <div className="flex flex-col w-full h-full items-center space-y-4">
        <h1 className="text-6xl font-bold text-sky-500">Ooooops!</h1>
        <h2 className="text-2xl font-bold">404 - Page not found</h2>
        <p className="text-sm text-ellipsis w-96 text-muted-foreground">
          This page does not exist. It may have been removed or the link is no
          longer valid.
        </p>
        <div className="flex flex-row space-x-4">
          <Button
            className="flex w-48 bg-sky-600 hover:bg-sky-800 rounded-full space-x-2"
            onClick={handleGoBack}
          >
            <BsArrowLeft className="w-6 h-6" />
            <p>Go back</p>
          </Button>
          <Button
            className="flex w-48 bg-primary-foreground hover:bg-secondary border border-muted-foreground rounded-full space-x-2 text-primary"
            onClick={handleGoHome}
          >
            <GoHome className="w-6 h-6" />
            <p>Home</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};

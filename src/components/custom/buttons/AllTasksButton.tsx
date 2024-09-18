"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";

export const AllTasksButton: React.FC = () => {
  const router = useRouter();

  const handleOpenAllTasks = () => {
    router.push("/tasks");
  };

  return (
    <Button
      variant="default"
      onClick={handleOpenAllTasks}
      className={"flex flex-row items-center bg-sky-600"}
    >
      All Tasks
      <BsArrowRight className="w-6 h-6 ml-2" />
    </Button>
  );
};

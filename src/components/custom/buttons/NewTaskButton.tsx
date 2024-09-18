"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

export const NewTaskButton = () => {
  const router = useRouter();

  const handleOpenNewTask = () => {
    router.push("/tasks/new-task");
  };

  return (
    <Button
      variant="default"
      onClick={handleOpenNewTask}
      className={"flex flex-row items-center bg-sky-600"}
    >
      <FiPlus className="w-8 h-8 mr-2" />
      New Task
    </Button>
  );
};

import { UpdateTaskForm } from "@/components/custom/tasks/forms/UpdateTaskForm";
import { getTask } from "@/server/actions/task";
import { notFound } from "next/navigation";
import { FormCard } from "@/components/custom/form/FormCard";

const TaskUpdatePage = async ({ params }: { params: { taskId: string } }) => {
  console.log("taskId", params.taskId);
  const task = await getTask({ taskId: params.taskId });
  console.log("task", task);
  if (!task.success || task.code === 404) {
    return notFound();
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-1/3 my-8">
        {task.success && task.data && (
          <FormCard
            cardTitle={"Edit task"}
            cardDescription={"Change fields to edit this Task"}
          >
            <UpdateTaskForm task={task.data} />
          </FormCard>
        )}
      </div>
    </div>
  );
};

export default TaskUpdatePage;

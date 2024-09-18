import { UpdateTaskForm } from "@/components/custom/tasks/forms/UpdateTaskForm";
import { getTask } from "@/server/actions/task";
import { notFound } from "next/navigation";

const TaskUpdatePage = async ({ params }: { params: { taskId: string } }) => {
  console.log("taskId", params.taskId);
  const task = await getTask({ taskId: params.taskId });
  console.log("task", task);
  if (!task.success || task.code === 404) {
    return notFound();
  }

  return (
    <div>
      <h1>Task Update Page</h1>
      {task.success && task.data && (
        <div>
          <p>{task.data.title}</p>
          <p>{task.data.description}</p>
        </div>
      )}
      <UpdateTaskForm />
    </div>
  );
};

export default TaskUpdatePage;

import { TasksList } from "@/components/custom/tasks/TasksList";
import { getAllTasks } from "@/server/actions/task";
import {
  GetAllTasksSearchParams,
  GetAllTasksSearchParamsSchema,
} from "@/app/(protected)/tasks/schema.zod";
import { redirect } from "next/navigation";

const TasksPage = async ({
  searchParams,
}: {
  searchParams: GetAllTasksSearchParams;
}) => {
  const parsedParams = GetAllTasksSearchParamsSchema.safeParse(searchParams);
  if (parsedParams.error) {
    redirect("/tasks?page=1&pageSize=10");
  }

  const tasks = await getAllTasks({
    page: parsedParams.data.page || 1,
    pageSize: parsedParams.data.pageSize || 10,
    completed: parsedParams.data.completed,
    query: parsedParams.data.query,
    sort: parsedParams.data.sort,
  });

  if (!tasks.success || !tasks.data) {
    return <div>Failed to fetch tasks</div>;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center py-8">
      <TasksList pagination={tasks.data.pagination} tasks={tasks.data.tasks} />
    </div>
  );
};

export default TasksPage;

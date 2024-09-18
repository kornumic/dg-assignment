import { TasksList } from "@/components/custom/tasks/TasksList";
import { getAllTasks } from "@/server/actions/task";
import { GetAllTasksSearchParams } from "@/app/(protected)/tasks/schema.zod";

const TasksPage = async ({
  searchParams,
}: {
  searchParams: GetAllTasksSearchParams;
}) => {
  const tasks = await getAllTasks({
    page: searchParams.page || 1,
    pageSize: searchParams.pageSize || 10,
    completed: searchParams.completed,
    query: searchParams.query,
    sort: searchParams.sort,
  });
  return (
    <div className="flex flex-col w-full justify-center items-center py-8">
      <TasksList tasks={tasks.data?.result} />
    </div>
  );
};

export default TasksPage;

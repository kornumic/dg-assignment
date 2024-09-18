import { getAllTasks } from "@/server/actions/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewTaskButton } from "@/components/custom/buttons/NewTaskButton";
import { MiniTaskItem } from "@/components/custom/tasks/lists/MiniTaskItem";
import { AllTasksButton } from "@/components/custom/buttons/AllTasksButton";

export const MiniTaskList = async () => {
  const tasks = await getAllTasks({
    page: 1,
    pageSize: 5,
    completed: false,
    query: "",
    sort: "asc",
  });

  return (
    <>
      {tasks &&
        tasks.success &&
        tasks.data &&
        tasks.data.pagination &&
        tasks.data.tasks && (
          <Card className="flex flex-col items-center w-full">
            <CardHeader className="flex flex-col items-start w-full">
              <CardTitle>{"Pending Tasks"}</CardTitle>
              <CardDescription>
                {`${tasks.data.pagination.totalTasks} pending Tasks`}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-full space-y-4">
              {tasks.data.tasks.map((task) => (
                <MiniTaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                />
              ))}
            </CardContent>
            <CardFooter className="flex flex-row w-full justify-end">
              {tasks.data.tasks.length === 0 && (
                <CardFooter>
                  <NewTaskButton />
                </CardFooter>
              )}
              {tasks.data.tasks.length > 0 && <AllTasksButton />}
            </CardFooter>
          </Card>
        )}

      {(!tasks || !tasks.success || !tasks.data) && (
        <Card>
          <CardHeader title={"Pending Tasks"}>
            <CardDescription>{"No pending tasks"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <NewTaskButton />
          </CardFooter>
        </Card>
      )}
    </>
  );
};

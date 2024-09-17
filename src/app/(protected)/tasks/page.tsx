import { getAllTasks } from "@/server/actions/task";

const TasksPage = async () => {
  const tasks = await getAllTasks({
    limit: 10,
    offset: 0,
  });

  if (tasks.success && tasks.data) {
    console.log(tasks.data?.result);
  }

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.success &&
        tasks.data?.result.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))}
    </div>
  );
};

export default TasksPage;

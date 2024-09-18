import { auth } from "@/lib/next-auth/auth";
import { getAllTasks } from "@/server/actions/task";

const HomePage = async () => {
  const session = await auth();

  if (session) {
    const tasks = await getAllTasks({
      page: 1,
      pageSize: 5,
      completed: false,
      query: "",
      sort: "desc",
    });
    return (
      <div>
        {tasks.data?.tasks.map((task) => <div key={task.id}>{task.title}</div>)}
      </div>
    );
  }
  return <div>Welcome to tasks</div>;
};

export default HomePage;

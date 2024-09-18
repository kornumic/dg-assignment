import { auth } from "@/lib/next-auth/auth";
import { MiniTaskList } from "@/components/custom/tasks/lists/MiniTaskList";

const HomePage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-row w-full h-full justify-center items-center">
      <div className="flex flex-col items-center w-1/2 space-y-4 my-8">
        <h1 className="text-4xl text-sky-600">Welcome to Tasks!</h1>
        <p className="w-72">
          Tasks is an awesome application that allows you to manage your daily
          tasks to stay perfectly organized.
        </p>
        {session && <MiniTaskList />}
      </div>
    </div>
  );
};

export default HomePage;

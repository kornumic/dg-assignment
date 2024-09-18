import { Task } from "@/server/model/Task";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CiCalendar } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";

export const TasksListItem = ({ task }: { task: Task }) => {
  return (
    <Card className="flex flex-row hover:bg-secondary transition-all">
      <CardHeader className="w-2/3 p-4">
        <Link href={`/tasks/${task.id}`}>
          <CardTitle className="w-full h-6 hover:text-sky-800 transition-all overflow-hidden truncate">
            {task.title}
          </CardTitle>
        </Link>
        <CardDescription className="w-full h-10 text-sky-600 overflow-ellipsis overflow-clip">
          {task.description ?? "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between items-end w-full py-4">
        <Badge
          className={`flex flex-row w-32 justify-center cursor-default ${
            task.completed
              ? "bg-sky-600 hover:bg-sky-500"
              : "bg-orange-400 hover:bg-orange-300"
          }`}
        >
          {task.completed ? "Completed" : "Incomplete"}
        </Badge>
        <div className="flex flex-row justify-end w-full select-none">
          <div className="align-bottom text-lg">
            {task.createdAt.toDateString()}
          </div>
          <CiCalendar className="w-7 h-7 ml-2 text-sky-600" />
        </div>
      </CardContent>
      <CardFooter className="flex w-fit p-4">
        <Link href={`/tasks/${task.id}`} className="flex w-fit h-fit">
          <FiEdit2 className="w-8 h-8" />
        </Link>
      </CardFooter>
    </Card>
  );
};

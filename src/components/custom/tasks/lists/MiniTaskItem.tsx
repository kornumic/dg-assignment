import { Card } from "@/components/ui/card";
import Link from "next/link";

export type MiniTaskItemProp = {
  id: string;
  title: string;
  description: string | undefined;
};
export const MiniTaskItem: React.FC<MiniTaskItemProp> = ({
  id,
  title,
  description,
}) => {
  return (
    <Card className="flex flex-col w-full p-4 hover:bg-sky-100 transition-all">
      <Link href={`/tasks/${id}`}>
        <h3 className="text-lg font-semibold text-sky-600 hover:text-sky-800 transition-all">
          {title}
        </h3>
      </Link>
      <p className="text-gray-500 truncate">{description}</p>
    </Card>
  );
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCheckmark } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FaFilter } from "react-icons/fa";

const FilterItem = ({
  title,
  handler,
  selected,
}: {
  title: string;
  handler: () => void;
  selected: boolean;
}) => {
  return (
    <li
      onClick={handler}
      className={`flex flex-row p-2 rounded-md justify-between items-center transition-all select-none cursor-pointer hover:bg-secondary ${selected && "text-sky-600"}`}
    >
      <p>{title}</p>
      <div className="flex flex-row justify-center items-center w-8 h-8">
        <IoCheckmark className={`w-6 h-6 ${selected ? "" : "hidden"}`} />
      </div>
    </li>
  );
};

export const TasksFiltersPopover = ({
  updateFilter,
}: {
  updateFilter: (filters: {
    status: "completed" | "notCompleted" | "all";
    sort: "asc" | "desc";
  }) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [status, setStatus] = useState<"completed" | "notCompleted" | "all">(
    "all",
  );
  let statusVariable = status;
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  let sortVariable = sort;

  const handleCloseModal = () => {
    updateFilter({ status: statusVariable, sort: sortVariable });
    setModalOpen(false);
  };

  const handleToggleModal = () => {
    if (modalOpen) {
      handleCloseModal();
    } else {
      setModalOpen(true);
    }
  };

  const handleSelectSort = (newState: "asc" | "desc") => {
    sortVariable = newState;
    setSort(newState);
    handleCloseModal();
  };

  const handleSelectStatus = (newState: "completed" | "notCompleted") => {
    if (newState === statusVariable) {
      statusVariable = "all";
      setStatus("all");
    } else {
      statusVariable = newState;
      setStatus(newState);
    }
    handleCloseModal();
  };

  return (
    <div>
      <Popover open={modalOpen}>
        <PopoverTrigger onClick={handleToggleModal}>
          <FaFilter className="flex w-fit h-5 cursor-pointer text-sky-600" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col px-2 w-fit space-y-2">
          <Label className="px-2">Sort by date</Label>
          <ul className="flex flex-col w-full">
            <FilterItem
              title={"Ascending"}
              handler={handleSelectSort.bind(null, "asc")}
              selected={sort === "asc"}
            />
            <FilterItem
              title={"Descending"}
              handler={handleSelectSort.bind(null, "desc")}
              selected={sort === "desc"}
            />
          </ul>
          <Separator className="my-2" />
          <Label className="px-2">Filter</Label>
          <ul className="flex flex-col w-full">
            <FilterItem
              title={"Completed"}
              handler={handleSelectStatus.bind(null, "completed")}
              selected={status === "completed"}
            />
            <FilterItem
              title={"Uncompleted"}
              handler={handleSelectStatus.bind(null, "notCompleted")}
              selected={status === "notCompleted"}
            />
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

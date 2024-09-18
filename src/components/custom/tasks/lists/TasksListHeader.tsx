"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { TasksFiltersPopover } from "@/components/custom/tasks/lists/TasksFiltersPopover";
import { TasksQueryField } from "@/components/custom/tasks/lists/TasksQueryField";
import { extractQueryParams } from "@/components/custom/tasks/lists/TasksList";
import { TasksPageSizePicker } from "@/components/custom/tasks/lists/TasksPageSizePicker";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

export const TasksListHeader = () => {
  const searchParams = useSearchParams();
  const pageSize = parseInt(searchParams.get("pageSize") || "5");
  const router = useRouter();

  const handleQueryChange = (query: string | undefined) => {
    const params = new URLSearchParams();
    const currentParams = extractQueryParams(searchParams);
    const mergedParams = { ...currentParams, query };

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    router.push(`/tasks?${params.toString()}`);
  };

  const handleFilterChange = (filters: {
    status: "completed" | "notCompleted" | "all";
    sort: "asc" | "desc";
  }) => {
    const params = new URLSearchParams();
    const currentParams = extractQueryParams(searchParams);

    const mergedParams = {
      ...currentParams,
      completed:
        filters.status === "all" ? undefined : filters.status === "completed",
      sort: filters.sort,
    };

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value.toString());
      }
    });

    router.push(`/tasks?${params.toString()}`);
  };

  const handlePageSizeChange = (pageSize: number) => {
    const params = new URLSearchParams();
    const currentParams = extractQueryParams(searchParams);
    const mergedParams = { ...currentParams, pageSize };

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value.toString());
      }
    });

    router.push(`/tasks?${params.toString()}`);
  };

  const handleOpenNewTask = () => {
    router.push("/tasks/new-task");
  };

  return (
    <div className="flex flex-col w-full pb-4">
      <div className="flex flex-row w-full items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-600">My Tasks</h1>
        </div>
        <div className="flex flex-row w-fit items-center space-x-4">
          <TasksPageSizePicker
            pageSize={pageSize}
            setPageSize={handlePageSizeChange}
          />
          <TasksQueryField updateQuery={handleQueryChange} />
          <TasksFiltersPopover updateFilter={handleFilterChange} />
          <Button
            variant="default"
            onClick={handleOpenNewTask}
            className={"flex flex-row items-center bg-sky-600"}
          >
            <FiPlus className="w-8 h-8 mr-2" />
            New Task
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
};

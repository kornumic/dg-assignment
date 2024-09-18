"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TasksFiltersPopover } from "@/components/custom/tasks/TasksFiltersPopover";
import { TasksQueryField } from "@/components/custom/tasks/TasksQueryField";
import { extractQueryParams } from "@/components/custom/tasks/TasksList";
import { TasksPageSizeSelector } from "@/components/custom/tasks/TasksPageSizeSelector";

export const TasksListHeader = () => {
  const searchParams = useSearchParams();
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
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

  return (
    <div className="flex flex-row w-full items-center justify-between ">
      <div>
        <h1 className="text-xl font-bold">Tasks</h1>
      </div>
      <div className="flex flex-row w-fit items-center space-x-4">
        <TasksPageSizeSelector
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
        />
        <TasksQueryField updateQuery={handleQueryChange} />
        <TasksFiltersPopover updateFilter={handleFilterChange} />
      </div>
    </div>
  );
};

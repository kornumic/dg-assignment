"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { extractQueryParams } from "@/components/custom/tasks/lists/TasksList";

export type TasksListFooterProps = {
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export const TasksListFooter = ({ pagination }: TasksListFooterProps) => {
  const searchParams = useSearchParams();
  const currentParams = extractQueryParams(searchParams);

  const getPageLink = (page: number) => {
    const params = new URLSearchParams();
    const mergedParams = { ...currentParams, page };

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value.toString());
      }
    });

    return `/tasks?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <div className="w-28 h-10">
          {pagination.page - 1 > 0 && (
            <PaginationItem>
              <PaginationPrevious href={getPageLink(pagination.page - 1)} />
            </PaginationItem>
          )}
        </div>
        <div className="w-10 h-10">
          {pagination.page - 1 > 0 && (
            <PaginationItem>
              <PaginationLink href={getPageLink(pagination.page - 1)}>
                {pagination.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <PaginationLink
            className="text-secondary bg-sky-600 hover:bg-sky-400 hover:text-secondary"
            href={getPageLink(pagination.page)}
            isActive={true}
          >
            {pagination.page}
          </PaginationLink>
        </PaginationItem>
        <div className="w-10 h-10">
          {pagination.page + 1 <= pagination.totalPages && (
            <PaginationItem>
              <PaginationLink href={getPageLink(pagination.page + 1)}>
                {pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>
        <div className="w-10 h-10">
          {pagination.page + 2 <= pagination.totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>
        <div className="w-20 h-10">
          {pagination.page + 1 <= pagination.totalPages && (
            <PaginationItem>
              <PaginationNext href={getPageLink(pagination.page + 1)} />
            </PaginationItem>
          )}
        </div>
      </PaginationContent>
    </Pagination>
  );
};

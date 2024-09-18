"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { IoCheckmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";

const SizeOption = ({
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

export const TasksPageSizePicker = ({
  pageSize,
  setPageSize,
}: {
  pageSize: number | undefined;
  setPageSize: (pageSize: number) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleToggleModal = () => {
    if (modalOpen) {
      handleCloseModal();
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const handleCancel = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleCancel);

    const handleConfirm = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleConfirm);

    return () => {
      window.removeEventListener("keydown", handleCancel);
      window.removeEventListener("keydown", handleConfirm);
    };
  });

  return (
    <div className="flex items-center">
      <Popover open={modalOpen}>
        <PopoverTrigger onClick={handleToggleModal}>
          <Button variant={"outline"} className="w-32">
            <FaChevronDown className="w-4 h-4 mr-2" />
            Page size
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col px-2 w-32 space-y-2">
          <Label className="px-2">Sort by date</Label>
          <ul className="flex flex-col w-full">
            <SizeOption
              title={"5"}
              handler={setPageSize.bind(null, 5)}
              selected={pageSize === 5}
            />
            <SizeOption
              title={"10"}
              handler={setPageSize.bind(null, 10)}
              selected={pageSize === 10}
            />
            <SizeOption
              title={"25"}
              handler={setPageSize.bind(null, 25)}
              selected={pageSize === 25}
            />
            <SizeOption
              title={"50"}
              handler={setPageSize.bind(null, 50)}
              selected={pageSize === 50}
            />
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

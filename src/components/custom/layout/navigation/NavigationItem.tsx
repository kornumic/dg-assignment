"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationItem = (props: {
  target: string;
  base: string;
  title: string;
}) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={props.target}
        className={
          pathName.includes(props.base)
            ? "underline underline-offset-4 text-primary-foreground"
            : ""
        }
      >
        {props.title}
      </Link>
    </li>
  );
};

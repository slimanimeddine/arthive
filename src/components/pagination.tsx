"use client";

import { usePage } from "@/hooks/params/page";
import { type LinksField, type MetaField } from "@/types/api-responses";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface PaginationProps {
  links: LinksField;
  meta: MetaField;
}

export default function Pagination({ links, meta }: PaginationProps) {
  const { setPage } = usePage();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      void setPage(newPage);
    }
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {links?.prev && (
          <Link
            href={`?page=${(meta?.current_page ?? 1) - 1}`}
            onClick={() => handlePageChange((meta?.current_page ?? 1) - 1)}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            Previous
          </Link>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {meta?.links
          ?.filter(
            (link) =>
              link.label !== "Next &raquo;" &&
              link.label !== "&laquo; Previous",
          )
          ?.map((link, index) =>
            link.url ? (
              <Link
                key={`${link.label}-${index}`}
                href={`?page=${link.label}`}
                onClick={() => handlePageChange(Number(link.label))}
                className={`inline-flex items-center border-t-2 ${
                  link.active
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } px-4 pt-4 text-sm font-medium`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ) : (
              <span
                key={`${link.label}-${index}`}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
              >
                {link.label}
              </span>
            ),
          )}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {links?.next && (
          <Link
            href={`?page=${(meta?.current_page ?? 1) + 1}`}
            onClick={() => handlePageChange((meta?.current_page ?? 1) + 1)}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

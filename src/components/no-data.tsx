"use client";

import { PaintBrushIcon } from "@heroicons/react/24/outline";

type NoDataProps = {
  title: string;
  message: string;
};

export default function NoData({ title, message }: NoDataProps) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <PaintBrushIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
}

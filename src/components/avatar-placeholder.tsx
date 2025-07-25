import { classNames } from "@/lib/utils";

type AvatarPlaceholderProps = {
  size: 6 | 8 | 10 | 12 | 14;
};

export default function AvatarPlaceholder({ size }: AvatarPlaceholderProps) {
  let sizeClass = "";

  switch (size) {
    case 6:
      sizeClass = "h-6 w-6";
      break;
    case 8:
      sizeClass = "h-8 w-8";
      break;
    case 10:
      sizeClass = "h-10 w-10";
      break;
    case 12:
      sizeClass = "h-12 w-12";
      break;
    case 14:
      sizeClass = "h-14 w-14";
      break;
  }
  return (
    <span
      className={classNames(
        "inline-block overflow-hidden rounded-full bg-gray-100",
        sizeClass,
      )}
    >
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="h-full w-full text-gray-300"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
}

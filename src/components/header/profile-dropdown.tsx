import { authHeader, fileUrl } from "@/lib/utils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceholder from "../avatar-placeholder";
import { useSession } from "@/hooks/session";
import { useShowAuthenticatedUser } from "@/hooks/endpoints/users";
import type { Route } from "next";

const userNavigation = [
  { name: "Your Profile", href: "/edit-profile" },
  { name: "Sign out", href: "/sign-out" },
];

export default function ProfileDropdown() {
  const { token } = useSession()!;

  const { isPending, isError, data } = useShowAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <span className="text-xs text-gray-700">...</span>;
  }

  if (isError) {
    return <span className="text-xs text-red-700">err</span>;
  }

  if (!data?.data) {
    return <></>;
  }

  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {data.data.photo ? (
            <Image
              alt=""
              src={fileUrl(data.data.photo)!}
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <AvatarPlaceholder size={8} />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        {userNavigation.map((item) => (
          <MenuItem key={item.name}>
            <Link
              href={item.href as Route}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

import { fileUrl } from "@/lib/utils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceholder from "../avatar-placeholder";

const userNavigation = [
  { name: "Your Profile", href: "/edit-profile" },
  { name: "Sign out", href: "/sign-out" },
];

type ProfileDropdownProps = {
  userPhoto?: string;
};

export default function ProfileDropdown({ userPhoto }: ProfileDropdownProps) {
  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {userPhoto ? (
            <Image
              alt=""
              src={fileUrl(userPhoto)!}
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
              href={item.href}
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

import { useShowUserById } from '@/api/users/users'
import { useGetSessionPayload } from '@/hooks/session/use-get-session-payload'
import { SessionPayload } from '@/lib/session'
import { fileUrl } from '@/lib/utils'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarPlaceholder } from '../avatar-placeholder'

const userNavigation = [
  { name: 'Your Profile', href: '/edit-profile' },
  { name: 'Sign out', href: '/sign-out' },
]

export function ProfileDropdown() {
  const sessionPayloadQuery = useGetSessionPayload()
  const sessionPayload = sessionPayloadQuery?.data?.payload as SessionPayload

  const userQuery = useShowUserById(sessionPayload?.id)

  const user = userQuery?.data?.data?.data

  return (
    <Menu
      as="div"
      className="relative ml-4 flex-shrink-0"
    >
      <div>
        <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {user && user.photo ? (
            <Image
              alt=""
              src={fileUrl(user.photo)}
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
  )
}

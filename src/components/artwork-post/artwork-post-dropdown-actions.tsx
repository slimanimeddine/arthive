'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const artworkPostDropdownOptions = [
  {
    id: 1,
    href: '#',
    name: 'Follow',
  },
  {
    id: 2,
    href: '#',
    name: 'Message',
  },
  {
    id: 3,
    href: '#',
    name: 'Report',
  },
]

export function ArtworkPostDropdownActions() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <MenuButton className="flex items-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon
            aria-hidden="true"
            className="h-7 w-7"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {artworkPostDropdownOptions.map((item) => (
            <MenuItem key={item.id}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

'use client'

import { classNames } from '@/lib/utils'
import {
  BellIcon,
  BookmarkIcon,
  CameraIcon,
  FolderIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UserPlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const secondaryNavigation = [
  {
    name: 'Edit Profile',
    href: '/edit-profile',
    icon: UserCircleIcon,
  },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  {
    name: 'Change Photo',
    href: '/change-photo',
    icon: CameraIcon,
  },
  {
    name: 'Submit Work',
    href: '/submit-work',
    icon: PlusCircleIcon,
  },
  {
    name: 'My Artworks',
    href: '/my-artworks',
    icon: FolderIcon,
  },
  { name: 'Favorites', href: '/favorites', icon: BookmarkIcon },
  { name: 'Followers', href: '/followers', icon: UsersIcon },
  { name: 'Following', href: '/following', icon: UserPlusIcon },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
      <h1 className="sr-only">General Settings</h1>

      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-10">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6'
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.href === pathname
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0'
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="px-4 py-8 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
        <div className="mx-auto max-w-2xl space-y-4 lg:mx-0 lg:max-w-none">
          {children}
        </div>
      </main>
    </div>
  )
}

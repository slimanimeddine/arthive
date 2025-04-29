'use client'
import { useCheckIfUnreadNotificationsExist } from '@/hooks/notifications'
import { useShowAuthenticatedUser } from '@/hooks/users'
import { authHeader, classNames, fileUrl, matchQueryStatus } from '@/lib/utils'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AvatarPlaceholder from '../avatar-placeholder'
import Logo from '../logo'
import ProfileDropdown from './profile-dropdown'
import { SearchInput } from './search-input'

const navigation = [
  { name: 'Artists', href: '/artists' },
  { name: 'Artworks', href: '/artworks' },
  { name: 'Submit Work', href: '/submit-work' },
]

const userNavigation = [
  { name: 'Your Profile', href: '/edit-profile' },
  { name: 'Sign out', href: '/sign-out' },
]

type NotificationIconProps = {
  token: string
}

function NotificationIcon({ token }: NotificationIconProps) {
  const authConfig = authHeader(token)

  const checkIfUnreadNotificationsExistQuery =
    useCheckIfUnreadNotificationsExist(authConfig)

  return matchQueryStatus(checkIfUnreadNotificationsExistQuery, {
    Loading: <span className="text-xs text-gray-700">...</span>,
    Errored: <span className="text-xs text-red-700">err</span>,
    Empty: <></>,
    Success: ({ data }) => {
      if (!data.data.exists) return <></>
      return (
        <span className="relative inline-block">
          <BellIcon
            aria-hidden="true"
            className="h-6 w-6"
          />
          <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </span>
      )
    },
  })
}

type HeaderAuthProps = NotificationIconProps

export default function HeaderAuth({ token }: HeaderAuthProps) {
  const authConfig = authHeader(token)

  const showAuthenticatedUserQuery = useShowAuthenticatedUser(authConfig)

  const pathname = usePathname()

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow border-b border-gray-300"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center"
            >
              <Logo />
            </Link>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300',
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500  hover:text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <SearchInput />
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <Link
              href="/notifications"
              className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <NotificationIcon token={token} />
            </Link>
            {matchQueryStatus(showAuthenticatedUserQuery, {
              Loading: <span className="text-xs text-gray-700">...</span>,
              Errored: <span className="text-xs text-red-700">err</span>,
              Empty: <></>,
              Success: ({ data }) => {
                const user = data.data
                return <ProfileDropdown userPhoto={user.photo} />
              },
            })}
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              as={Link}
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300',
                'block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            {matchQueryStatus(showAuthenticatedUserQuery, {
              Loading: <span className="text-xs text-gray-700">...</span>,
              Errored: <span className="text-xs text-red-700">err</span>,
              Empty: <></>,
              Success: ({ data }) => {
                const user = data.data
                if (user.photo) {
                  return (
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        src={fileUrl(user.photo)!}
                        className="h-10 w-10 rounded-full"
                        width={40}
                        height={40}
                      />
                    </div>
                  )
                }
                return <AvatarPlaceholder size={10} />
              },
            })}

            {matchQueryStatus(showAuthenticatedUserQuery, {
              Loading: <span className="text-xs text-gray-700">...</span>,
              Errored: <span className="text-xs text-red-700">err</span>,
              Empty: <></>,
              Success: ({ data }) => {
                const user = data.data
                return (
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                )
              },
            })}

            <Link
              href="/notifications"
              className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <NotificationIcon token={token} />
            </Link>
          </div>
          <div className="mt-3 space-y-1">
            {userNavigation.map((item) => (
              <DisclosureButton
                as={Link}
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

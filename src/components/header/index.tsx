import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '../logo'
import { ProfileDropdown } from './profile-dropdown'
import { SearchInput } from './search-input'
import { usePathname } from 'next/navigation'
import { classNames } from '@/lib/utils'

const navigation = [
  { name: 'Artists', href: '/artists' },
  { name: 'Artworks', href: '/artworks' },
  { name: 'Submit', href: '/submit' },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export function Header() {
  const userSignedIn = false
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
                  // "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
            {!userSignedIn && (
              <Link
                href="/sign-in"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Sign in
              </Link>
            )}
            {userSignedIn && (
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            )}

            {userSignedIn && <ProfileDropdown />}
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
            {!userSignedIn && (
              <Link
                href="#"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Sign in
              </Link>
            )}

            {userSignedIn && (
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
            )}
            {userSignedIn && (
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Tom Cook
                </div>
                <div className="text-sm font-medium text-gray-500">
                  tom@example.com
                </div>
              </div>
            )}
            {userSignedIn && (
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            )}
          </div>
          <div className="mt-3 space-y-1">
            {userSignedIn &&
              userNavigation.map((item) => (
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

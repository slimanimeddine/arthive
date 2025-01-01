'use client'
import { classNames } from '@/lib/utils'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
} from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const filters = [
  'Painting',
  'Graphic',
  'Sculpture',
  'Folk Art',
  'Textile',
  'Ceramics',
  'Beads',
  'Paper',
  'Glass',
  'Dolls',
  'Jewellery',
  'Fresco',
  'Metal',
  'Mosaic',
  'Stained Glass Windows',
]

const sortOptions = [
  { name: 'Popular', current: true },
  { name: 'Trending', current: false },
  { name: 'Rising', current: false },
  { name: 'New', current: false },
]

export function SortFilterArtists() {
  const [filter, setFilter] = useState(filters[2])
  return (
    <div className="bg-white">
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center"
      >
        <h2
          id="filter-heading"
          className="sr-only"
        >
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 pb-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <DisclosureButton className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                />
                Filters
              </DisclosureButton>
            </div>
          </div>
        </div>
        <DisclosurePanel className="border-t border-gray-200 py-6">
          <div className="mx-auto max-w-7xl px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <RadioGroup
              value={filter}
              onChange={setFilter}
              className="flex flex-wrap gap-2 justify-end"
            >
              {filters.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className="whitespace-nowrap cursor-pointer focus:outline-none flex items-center justify-center rounded-md bg-white p-2 text-xs font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 data-[checked]:bg-indigo-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-indigo-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-500 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset"
                >
                  {option}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </DisclosurePanel>
        <div className="col-start-1 row-start-1 pb-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu
              as="div"
              className="relative inline-block"
            >
              <div className="flex">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <span
                        className={classNames(
                          option.current
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          'block px-4 py-2 text-sm data-[focus]:bg-gray-100'
                        )}
                      >
                        {option.name}
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

'use client'

import { HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const categoriesRatings = [
  {
    id: 1,
    category: 'Painting',
    stars: 12,
  },
  {
    id: 2,
    category: 'Photography',
    stars: 32,
  },
  {
    id: 3,
    category: 'Sculpture',
    stars: 62,
  },
  {
    id: 4,
    category: 'Digital Art',
    stars: 82,
  },
  {
    id: 5,
    category: 'Mixed Media',
    stars: 92,
  },
  {
    id: 6,
    category: 'Prints',
    stars: 62,
  },
  {
    id: 7,
    category: 'Drawing',
    stars: 32,
  },
  {
    id: 8,
    category: 'Textile Arts',
    stars: 52,
  },
]

export function ArtistInformation() {
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white">
      <div>
        <div className="pb-1 sm:pb-6">
          <div>
            <div className="relative h-40 sm:h-56">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
                className="absolute h-full w-full object-cover rounded-lg"
                height={600}
                width={800}
              />
            </div>
            <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
              <div className="sm:flex-1">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      Ashley Porter
                    </h3>
                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                      <span className="sr-only">Online</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">@ashleyporter</p>
                </div>
                <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                  <button
                    type="button"
                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                  >
                    Follow
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            <div>
              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                Bio
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <p>
                  Enim feugiat ut ipsum, neque ut. Tristique mi id elementum
                  praesent. Gravida in tempus feugiat netus enim aliquet a, quam
                  scelerisque. Dictumst in convallis nec in bibendum aenean
                  arcu.
                </p>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                Country
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                United States
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                Date joined
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <time dateTime="2020-01-07">January 7, 2020</time>
              </dd>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Total ratings</h3>
                <div className="flex items-center gap-x-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-900 font-medium">
                    35966
                  </span>
                </div>
              </div>
              <dl className="mt-2">
                {categoriesRatings.map((categoryRating) => (
                  <div
                    key={categoryRating.id}
                    className="flex justify-between py-3 text-sm font-medium"
                  >
                    <dt className="text-gray-500">{categoryRating.category}</dt>
                    <div className="flex items-center gap-x-1">
                      <HeartIcon className="h-5 w-5" />
                      <span className="text-sm text-gray-900 font-medium">
                        {categoryRating.stars}
                      </span>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

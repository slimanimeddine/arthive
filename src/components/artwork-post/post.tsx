'use client'

import Image from 'next/image'
import { BookmarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ArtworkPostDropdownActions } from './artwork-post-dropdown-actions'
import { PostComment } from './post-comment'
import { Comment } from './comment'

export function ArtworkPost() {
  return (
    <div className="p-6 py-14 bg-white h-screen overflow-scroll">
      <div className="flex flex-col sm:max-w-4xl mx-auto gap-y-5">
        {/* 1st line */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <Link
              href="/jack"
              className="flex items-center gap-x-3"
            >
              <div>
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="text-md font-medium text-gray-900">
                  Jack Corneliussen
                </p>
              </div>
            </Link>

            <button className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Follow
            </button>
          </div>
          <ArtworkPostDropdownActions />
        </div>

        {/* 2nd line */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">A Badass painting</h3>
          <p className="text-xs text-gray-500">published on Oct 6, 10</p>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-y-1">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
            className="object-cover w-full h-[600px] rounded-lg cursor-zoom-in"
            width={500}
            height={500}
          />
          <div className="flex items-center justify-start gap-x-1">
            <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                className="object-cover cursor-zoom-in"
                width={128}
                height={128}
              />
            </div>
            <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                className="object-cover cursor-zoom-in"
                width={128}
                height={128}
              />
            </div>
            <div className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                className="object-cover cursor-zoom-in"
                width={128}
                height={128}
              />
            </div>
          </div>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil,
            inventore. Suscipit quisquam exercitationem totam. Optio corrupti
            debitis, alias iusto rem amet ea? Perspiciatis non deserunt
            blanditiis veniam fuga. Porro, minima.
          </p>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        {/* 3rd line */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            <span className="font-semibold">Liked by</span>
            <div className="flex -space-x-1 overflow-hidden">
              <Link href="#">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-8 rounded-full ring-2 ring-white"
                  width={32}
                  height={32}
                />
              </Link>
              <Link href="#">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-8 rounded-full ring-2 ring-white"
                  width={32}
                  height={32}
                />
              </Link>

              <Link href="#">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  className="inline-block size-8 rounded-full ring-2 ring-white"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
            <span>and</span>
            <button>
              <span className="font-semibold">Others</span>
            </button>
          </div>
          <div className="flex items-center gap-x-4">
            <button>
              <HandThumbUpIcon className="h-6 w-6" />
            </button>
            <button>
              <BookmarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* comments */}

        <section className="bg-white dark:bg-gray-900 py-4 lg:py-8 antialiased">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comments (20)
              </h2>
            </div>
            <PostComment />
            <div className="divide-y">
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>
        </section>
        {/* ////// */}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PostComment } from './post-comment'
import { Comment } from './comment'
import { useShowPublishedArtwork } from '@/api/artworks/artworks'
import { fileUrl } from '@/lib/utils'
import { AvatarPlaceholder } from '../avatar-placeholder'
import LikedByModal from './liked-by-modal'
import { FollowButton } from './follow-button'
import { LikeButton } from './like-button'
import { FavoriteButton } from './favorite-button'
import { notFound } from 'next/navigation'

export function ArtworkPost({ id }: { id: number }) {
  const artworkQuery = useShowPublishedArtwork(id)

  if (artworkQuery.isPending) {
    return <p className="mt-2 text-sm text-gray-700">Loading...</p>
  }

  if (artworkQuery.isError) {
    if (artworkQuery.error?.response?.status === 404) {
      notFound()
    }
    return (
      <div className="h-screen">
        <p className="mt-2 text-sm text-red-700">
          {artworkQuery.error?.response?.data.message}
        </p>
      </div>
    )
  }

  const artworkData = artworkQuery.data!.data.data!

  const artwork = {
    id: artworkData.id!,
    title: artworkData.title!,
    description: artworkData.description!,
    publishedAt: artworkData.created_at!,
    // photos
    mainPhotoUrl: fileUrl(artworkData.artwork_main_photo_path!)!,
    photos: artworkData
      .artwork_photos!.filter((photo) => photo.is_main === 0)
      .map((photo) => ({
        id: photo.id!,
        url: fileUrl(photo.path!)!,
      })),
    // counts
    commentsCount: artworkData.artwork_comments_count!,
    likesCount: artworkData.artwork_likes_count!,
    // liked by
    likedBy: artworkData.artwork_likes!.map((artworkLike) => ({
      id: artworkLike.user_id!,
      user: {
        fullName: `${artworkLike.user!.first_name} ${artworkLike.user!.last_name}`,
        username: artworkLike.user!.username!,
        profilePictureUrl: fileUrl(artworkLike.user!.photo),
      },
    })),
    // comments
    comments: artworkData.artwork_comments!.map((artworkComment) => ({
      id: artworkComment.id!,
      content: artworkComment.comment_text!,
      commentedAt: artworkComment.created_at!,
      artworkId: artworkComment.artwork_id!,
      user: {
        id: artworkComment.user_id!,
        fullName: `${artworkComment.user!.first_name} ${artworkComment.user!.last_name}`,
        username: artworkComment.user!.username!,
        profilePictureUrl: fileUrl(artworkComment.user!.photo),
      },
    })),
    // tags
    tags: artworkData.tags!.map((tag) => ({
      id: tag.id!,
      name: tag.name!,
    })),
    // artist
    artist: {
      id: artworkData.user!.id!,
      fullName: `${artworkData.user!.first_name} ${artworkData.user!.last_name}`,
      username: artworkData.user!.username!,
      profilePictureUrl: fileUrl(artworkData.user!.photo),
    },
  }

  return (
    <div className="p-6 py-14 bg-white">
      <div className="flex flex-col sm:max-w-4xl mx-auto gap-y-5">
        {/* 1st line */}
        <div className="flex justify-between items-center">
          <Link
            href={`/artists/${artwork.artist.username}`}
            className="flex items-center gap-x-3"
          >
            <div>
              {artwork.artist.profilePictureUrl ? (
                <Image
                  alt=""
                  src={artwork.artist.profilePictureUrl}
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              ) : (
                <AvatarPlaceholder size={10} />
              )}
            </div>
            <div>
              <p className="text-md font-medium text-gray-900">
                {artwork.artist.fullName}
              </p>
            </div>
          </Link>
          <FollowButton userId={artwork.artist.id} />
        </div>

        {/* 2nd line */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{artwork.title}</h3>
          <p className="text-xs text-gray-500">
            published on {new Date(artwork.publishedAt).toDateString()}
          </p>
        </div>

        {artwork.tags.length > 0 && (
          <div className="flex items-center gap-x-1">
            {artwork.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/artworks?tag=${tag.name}`}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Image */}
        <div className="flex flex-col gap-y-1">
          <Image
            alt=""
            src={artwork.mainPhotoUrl}
            className="object-cover w-full h-[600px] rounded-lg"
            width={500}
            height={500}
          />
          {artwork.photos.length > 0 && (
            <div className="flex items-center justify-start gap-x-1">
              {artwork.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group block w-32 h-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                >
                  <Image
                    alt=""
                    src={photo.url}
                    className="object-cover"
                    width={128}
                    height={128}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p>{artwork.description}</p>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        {/* 3rd line */}
        <div className="flex justify-between items-center">
          {artwork.likedBy.length > 0 ? (
            <div className="flex items-center gap-x-1">
              <span className="font-semibold">Liked by</span>
              <div className="flex -space-x-1 overflow-hidden">
                {artwork.likedBy.slice(0, 3).map((like) => (
                  <Link
                    key={like.id}
                    href={`/artists/${like.user.username}`}
                  >
                    {like.user.profilePictureUrl ? (
                      <Image
                        alt=""
                        src={like.user.profilePictureUrl}
                        className="inline-block size-8 rounded-full ring-2 ring-white"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <AvatarPlaceholder size={8} />
                    )}
                  </Link>
                ))}
              </div>
              <span>and</span>
              <LikedByModal likes={artwork.likedBy} />
            </div>
          ) : (
            <p className="font-semibold">No one has liked this artwork.</p>
          )}

          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-4">
              <span className="font-semibold text-md border-r px-4">
                Likes {artwork.likesCount}
              </span>
              <LikeButton artworkId={artwork.id} />
            </div>
            <FavoriteButton artworkId={artwork.id} />
          </div>
        </div>

        {/* comments */}

        <section className="bg-white dark:bg-gray-900 py-4 lg:py-8 antialiased">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comments ({artwork.commentsCount})
              </h2>
            </div>
            <PostComment artworkId={artwork.id} />
            {artwork.comments.length > 0 && (
              <div className="divide-y">
                {artwork.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        {/* ////// */}
      </div>
    </div>
  )
}

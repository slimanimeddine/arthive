"use client";

import { useCreateArtwork } from "@/hooks/endpoints/artworks";
import { useSession } from "@/hooks/session";
import { TAGS } from "@/lib/constants";
import { authHeader } from "@/lib/utils";
import { createArtworkBody } from "@/schemas/artworks";
import useArtworkStore from "@/stores/artwork-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";

const schema = createArtworkBody.omit({ photos: true });
type FormData = z.infer<typeof schema>;

export default function ThirdStep() {
  const { token } = useSession()!;
  const { mutate } = useCreateArtwork(authHeader(token));

  const queryClient = useQueryClient();

  const {
    photos,
    mainPhoto,
    croppedMainPhoto,
    categories,
    title,
    description,
    setCategories,
    setTitle,
    setDescription,
    setId,
  } = useArtworkStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title, description, tags: categories },
  });

  const onSubmit = (data: FormData) => {
    setTitle(data.title);
    setDescription(data.description);
    setCategories(data.tags);

    const dataObj = {
      title: data.title,
      description: data.description,
      tags: data.tags,
      photos: photos.map((item) => ({
        file: item === mainPhoto ? croppedMainPhoto! : item,
        is_main: item === mainPhoto,
      })),
    };

    mutate(
      {
        data: dataObj,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: (data) => {
          setId(data.data.id);
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/users/me/artworks"],
          });
          toast.success("Artwork draft created successfully!");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Step 3: Fill Details</h2>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          {...register("title")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description:
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Categories:
        </label>
        <select
          multiple
          {...register("tags")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {TAGS.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
        {errors.tags && (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Save as Draft
      </button>
    </form>
  );
}

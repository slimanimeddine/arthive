"use client";

import {
  type UpdateArtworkDraftBody,
  useUpdateArtworkDraft,
} from "@/hooks/endpoints/artworks";
import { TAGS } from "@/lib/constants";
import { authHeader, getDirtyValues } from "@/lib/utils";
import { updateArtworkDraftBody } from "@/schemas/artworks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type FirstStepProps } from "./first-step";
import { useSession } from "@/hooks/session";

type ThirdStepProps = FirstStepProps;

export default function ThirdStep({ artwork }: ThirdStepProps) {
  const { token } = useSession()!;
  const { mutate, isPending } = useUpdateArtworkDraft(authHeader(token));

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState } = useForm<UpdateArtworkDraftBody>(
    {
      resolver: zodResolver(updateArtworkDraftBody),
      defaultValues: {
        title: artwork.title,
        description: artwork.description,
        tags: artwork.tags.map((item) => item.name),
      },
    },
  );

  const onSubmit = (data: UpdateArtworkDraftBody) => {
    const dirtyValues = getDirtyValues(formState.dirtyFields, data);

    mutate(
      {
        artworkId: artwork.id,
        data: dirtyValues,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/users/me/artworks"],
          });
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/users/me/artworks/${artwork.id}`],
          });

          toast.success("Artwork draft updated successfully!");
        },
      },
    );
  };

  const isDisabled = formState.isSubmitting || isPending || !formState.isDirty;

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
        {formState.errors.title && (
          <p className="text-sm text-red-500">
            {formState.errors.title.message}
          </p>
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
        {formState.errors.description && (
          <p className="text-sm text-red-500">
            {formState.errors.description.message}
          </p>
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
        {formState.errors.tags && (
          <p className="text-sm text-red-500">
            {formState.errors.tags.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Update Draft
      </button>
    </form>
  );
}

"use client";
import { type SignUpBody, useSignUp } from "@/hooks/endpoints/authentication";
import { onError } from "@/lib/utils";
import { signUpBody } from "@/schemas/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignUpBody>({
    resolver: zodResolver(signUpBody),
  });

  const router = useRouter();

  const signUpMutation = useSignUp();

  function onSubmit(data: SignUpBody) {
    signUpMutation.mutate(
      {
        data,
      },
      {
        onError,
        onSuccess: () => {
          toast.success("Account created successfully!");
          reset();
          router.back();
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || signUpMutation.isPending;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            id="username"
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("username")}
          />
          {formState.errors.username && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.username.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password-confirmation"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password confirmation
        </label>
        <div className="mt-2">
          <input
            id="password-confirmation"
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("password_confirmation")}
          />
          {formState.errors.password_confirmation && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password_confirmation.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={isDisabled}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

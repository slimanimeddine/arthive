import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export type ListUsers200 = PaginatedApiResponse<
  Omit<
    User,
    | "artworks"
    | "drafts"
    | "followers"
    | "following"
    | "favorites"
    | "artwork_likes"
    | "artwork_comments"
    | "received_artwork_likes"
  >
>;
export type ListUsersParams = {
  "filter[country]"?: string;
  "filter[tag]"?: string;
  "filter[verified]"?: boolean;
  include?: "publishedArtworks";
  searchQuery?: string;
  sort?: "new" | "popular";
  page?: number;
  perPage?: number;
};

export type ShowAuthenticatedUser200 = ApiResource<UserModel>;
export type ShowAuthenticatedUser401 = UnauthenticatedApiResponse;

export type ShowUser200 = ApiResource<UserModel>;
export type ShowUser404 = NotFoundApiResponse;

export type ShowUserById200 = ApiResource<UserModel>;
export type ShowUserById404 = NotFoundApiResponse;

export type UpdateAuthenticatedUser200 = ApiResource<UserModel>;
export type UpdateAuthenticatedUser401 = UnauthenticatedApiResponse;
export type UpdateAuthenticatedUser403 = UnauthorizedApiResponse;
export type UpdateAuthenticatedUserBody = z.infer<
  typeof updateAuthenticatedUserBody
>;

import type { BodyType, ErrorType } from "@/lib/axios";
import { customInstance } from "@/lib/axios";
import { type updateAuthenticatedUserBody } from "@/schemas/users";
import {
  type ApiResource,
  type NotFoundApiResponse,
  type PaginatedApiResponse,
  type UnauthenticatedApiResponse,
  type UnauthorizedApiResponse,
} from "@/types/api-responses";
import { type User, type UserModel } from "@/types/models/user";
import { type z } from "zod";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * Retrieve the currently authenticated user
 * @summary Show Authenticated User
 */
export const showAuthenticatedUser = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowAuthenticatedUser200>(
    { url: `/api/v1/users/me`, method: "GET", signal },
    options,
  );
};

export const getShowAuthenticatedUserQueryKey = () => {
  return [`/api/v1/users/me`] as const;
};

export const getShowAuthenticatedUserQueryOptions = <
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof showAuthenticatedUser>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowAuthenticatedUserQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showAuthenticatedUser>>
  > = ({ signal }) => showAuthenticatedUser(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof showAuthenticatedUser>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type ShowAuthenticatedUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof showAuthenticatedUser>>
>;
export type ShowAuthenticatedUserQueryError =
  ErrorType<ShowAuthenticatedUser401>;

export function useShowAuthenticatedUser<
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUser>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUser>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowAuthenticatedUser<
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUser>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUser>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowAuthenticatedUser<
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUser>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Show Authenticated User
 */

export function useShowAuthenticatedUser<
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUser>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getShowAuthenticatedUserQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Show Authenticated User
 */
export const prefetchShowAuthenticatedUser = async <
  TData = Awaited<ReturnType<typeof showAuthenticatedUser>>,
  TError = ErrorType<ShowAuthenticatedUser401>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUser>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowAuthenticatedUserQueryOptions(options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Update the currently authenticated user
 * @summary Update Authenticated User
 */
export const updateAuthenticatedUser = (
  updateAuthenticatedUserBody?: BodyType<UpdateAuthenticatedUserBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  if (updateAuthenticatedUserBody?.username !== undefined) {
    formData.append("username", updateAuthenticatedUserBody.username);
  }
  if (updateAuthenticatedUserBody?.first_name !== undefined) {
    formData.append("first_name", updateAuthenticatedUserBody.first_name);
  }
  if (updateAuthenticatedUserBody?.last_name !== undefined) {
    formData.append("last_name", updateAuthenticatedUserBody.last_name);
  }
  if (updateAuthenticatedUserBody?.email !== undefined) {
    formData.append("email", updateAuthenticatedUserBody.email);
  }
  if (updateAuthenticatedUserBody?.country !== undefined) {
    formData.append("country", updateAuthenticatedUserBody.country);
  }
  if (updateAuthenticatedUserBody?.bio !== undefined) {
    formData.append("bio", updateAuthenticatedUserBody.bio);
  }
  if (updateAuthenticatedUserBody?.photo !== undefined) {
    formData.append("photo", updateAuthenticatedUserBody.photo);
  }

  return customInstance<UpdateAuthenticatedUser200>(
    {
      url: `/api/v1/users/me`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal,
    },
    options,
  );
};

export const getUpdateAuthenticatedUserMutationOptions = <
  TError = ErrorType<UpdateAuthenticatedUser401 | UpdateAuthenticatedUser403>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateAuthenticatedUser>>,
    TError,
    { data: BodyType<UpdateAuthenticatedUserBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateAuthenticatedUser>>,
  TError,
  { data: BodyType<UpdateAuthenticatedUserBody> },
  TContext
> => {
  const mutationKey = ["updateAuthenticatedUser"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateAuthenticatedUser>>,
    { data: BodyType<UpdateAuthenticatedUserBody> }
  > = (props) => {
    const { data } = props ?? {};

    return updateAuthenticatedUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateAuthenticatedUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateAuthenticatedUser>>
>;
export type UpdateAuthenticatedUserMutationBody =
  BodyType<UpdateAuthenticatedUserBody>;
export type UpdateAuthenticatedUserMutationError = ErrorType<
  UpdateAuthenticatedUser401 | UpdateAuthenticatedUser403
>;

/**
 * @summary Update Authenticated User
 */
export const useUpdateAuthenticatedUser = <
  TError = ErrorType<UpdateAuthenticatedUser401 | UpdateAuthenticatedUser403>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof updateAuthenticatedUser>>,
      TError,
      { data: BodyType<UpdateAuthenticatedUserBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof updateAuthenticatedUser>>,
  TError,
  { data: BodyType<UpdateAuthenticatedUserBody> },
  TContext
> => {
  const mutationOptions = getUpdateAuthenticatedUserMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Retrieve a list of all users
 * @summary List Users
 */
export const listUsers = (
  params?: ListUsersParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ListUsers200>(
    { url: `/api/v1/users`, method: "GET", params, signal },
    options,
  );
};

export const getListUsersQueryKey = (params?: ListUsersParams) => {
  return [`/api/v1/users`, ...(params ? [params] : [])] as const;
};

export const getListUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getListUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listUsers>>> = ({
    signal,
  }) => listUsers(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listUsers>>,
    TError,
    TData
  > & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type ListUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof listUsers>>
>;
export type ListUsersQueryError = ErrorType<unknown>;

export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  params: undefined | ListUsersParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUsers>>,
          TError,
          Awaited<ReturnType<typeof listUsers>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listUsers>>,
          TError,
          Awaited<ReturnType<typeof listUsers>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary List Users
 */

export function useListUsers<
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getListUsersQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary List Users
 */
export const prefetchListUsers = async <
  TData = Awaited<ReturnType<typeof listUsers>>,
  TError = ErrorType<unknown>,
>(
  queryClient: QueryClient,
  params?: ListUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getListUsersQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Retrieve a single user by id
 * @summary Show User By Id
 */
export const showUserById = (
  userId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowUserById200>(
    { url: `/api/v1/users/${userId}`, method: "GET", signal },
    options,
  );
};

export const getShowUserByIdQueryKey = (userId: string) => {
  return [`/api/v1/users/${userId}`] as const;
};

export const getShowUserByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowUserByIdQueryKey(userId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showUserById>>> = ({
    signal,
  }) => showUserById(userId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!userId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showUserById>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ShowUserByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof showUserById>>
>;
export type ShowUserByIdQueryError = ErrorType<ShowUserById404>;

export function useShowUserById<
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  userId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUserById>>,
          TError,
          Awaited<ReturnType<typeof showUserById>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowUserById<
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUserById>>,
          TError,
          Awaited<ReturnType<typeof showUserById>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowUserById<
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Show User By Id
 */

export function useShowUserById<
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getShowUserByIdQueryOptions(userId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Show User By Id
 */
export const prefetchShowUserById = async <
  TData = Awaited<ReturnType<typeof showUserById>>,
  TError = ErrorType<ShowUserById404>,
>(
  queryClient: QueryClient,
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUserById>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowUserByIdQueryOptions(userId, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Retrieve a single user by username
 * @summary Show User
 */
export const showUser = (
  username: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowUser200>(
    { url: `/api/v1/users/${username}`, method: "GET", signal },
    options,
  );
};

export const getShowUserQueryKey = (username: string) => {
  return [`/api/v1/users/${username}`] as const;
};

export const getShowUserQueryOptions = <
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowUserQueryKey(username);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showUser>>> = ({
    signal,
  }) => showUser(username, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type ShowUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof showUser>>
>;
export type ShowUserQueryError = ErrorType<ShowUser404>;

export function useShowUser<
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  username: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUser>>,
          TError,
          Awaited<ReturnType<typeof showUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowUser<
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showUser>>,
          TError,
          Awaited<ReturnType<typeof showUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowUser<
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Show User
 */

export function useShowUser<
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getShowUserQueryOptions(username, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Show User
 */
export const prefetchShowUser = async <
  TData = Awaited<ReturnType<typeof showUser>>,
  TError = ErrorType<ShowUser404>,
>(
  queryClient: QueryClient,
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showUser>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowUserQueryOptions(username, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

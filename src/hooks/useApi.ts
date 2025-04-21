import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../lib/api/types';

type ApiError = AxiosError<ErrorResponse>;

export function useApiQuery<TData>(
  key: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, ApiError>({
    queryKey: key,
    queryFn,
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onSettled: () => {
      // Invalidate and refetch relevant queries after mutation
      if (options?.onSettled) {
        options.onSettled();
      }
      return queryClient.invalidateQueries();
    },
    ...options,
  });
}
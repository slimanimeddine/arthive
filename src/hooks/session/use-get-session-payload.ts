import { useQuery } from '@tanstack/react-query'

export function useGetSessionPayload() {
  const query = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await fetch('/api/session', {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to get session payload')
      }
      return response.json()
    },
  })

  return query
}

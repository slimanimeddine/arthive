import { SessionPayload } from '@/lib/session'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateSession() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (sessionPayload: SessionPayload) => {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionPayload),
      })

      if (!response.ok) {
        throw new Error('Failed to create session')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
    },
  })

  return mutation
}

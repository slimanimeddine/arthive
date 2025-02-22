import axios from 'axios'
import toast from 'react-hot-toast'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function onError(error: Error) {
  if (axios.isAxiosError(error) && error.response) {
    toast.error(`${error.response.data.message || 'Something went wrong'}`)
  } else {
    toast.error(`${error.message}`)
  }
}

import { create } from 'zustand'

interface EditCommentState {
  formVisble: boolean
  setFormVisible: (value: boolean) => void
}

export const useEditCommentStore = create<EditCommentState>()((set) => ({
  formVisble: false,
  setFormVisible: (value: boolean) => set({ formVisble: value }),
}))

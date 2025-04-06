import { Tag } from '@/lib/types'
import { create } from 'zustand'

type Photo = {
  id: number
  path: string
}

interface EditArtworkState {
  step: number
  photos: Photo[]
  mainPhoto: string | null
  croppedMainPhoto: string | null
  categories: Tag[]
  title: string
  description: string
  status: 'draft' | 'published'
  id?: number

  setStep: (step: number) => void
  addPhotos: (newPhotos: Photo[]) => void
  removePhoto: (photoId: number) => void
  removeMainPhoto: () => void
  removeCroppedMainPhoto: () => void
  setMainPhoto: (photo: string) => void
  setCroppedMainPhoto: (photo: string) => void
  setCategories: (categories: Tag[]) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setStatus: (status: 'draft' | 'published') => void
  setId: (id: number) => void

  setToDefault: () => void

  isStepValid: () => boolean
}

const useEditArtworkStore = create<EditArtworkState>((set, get) => ({
  step: 1,
  photos: [],
  mainPhoto: null,
  croppedMainPhoto: null,
  categories: [],
  title: '',
  description: '',
  status: 'draft',
  id: undefined,

  setStep: (step) => set({ step }),
  addPhotos: (newPhotos) =>
    set((state) => ({ photos: [...state.photos, ...newPhotos] })),
  removePhoto: (photoId) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== photoId),
    })),
  setMainPhoto: (photo) => set({ mainPhoto: photo }),
  removeMainPhoto: () => set({ mainPhoto: null }),
  removeCroppedMainPhoto: () => set({ croppedMainPhoto: null }),
  setCroppedMainPhoto: (croppedPhoto) =>
    set({ croppedMainPhoto: croppedPhoto }),
  setCategories: (categories) => set({ categories }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setStatus: (status) => set({ status }),
  setId: (id) => set({ id }),
  setToDefault: () =>
    set({
      step: 1,
      photos: [],
      mainPhoto: null,
      croppedMainPhoto: null,
      categories: [],
      title: '',
      description: '',
      status: 'draft',
    }),

  isStepValid: () => {
    const {
      step,
      photos,
      mainPhoto,
      croppedMainPhoto,
      categories,
      title,
      description,
    } = get()

    switch (step) {
      case 1:
        return photos.length > 0 && photos.length <= 10
      case 2:
        return !!mainPhoto && !!croppedMainPhoto
      case 3:
        return (
          title.trim().length >= 3 &&
          description.trim().length >= 10 &&
          categories.length > 0 &&
          categories.length <= 3
        )
      case 4:
        return true
      default:
        return false
    }
  },
}))

export default useEditArtworkStore

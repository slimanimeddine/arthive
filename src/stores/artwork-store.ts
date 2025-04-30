import { Tag } from '@/types/misc'
import { create } from 'zustand'

interface ArtworkState {
  step: number
  photos: Blob[]
  mainPhoto: Blob | null
  croppedMainPhoto: Blob | null
  categories: Tag[]
  title: string
  description: string
  status: 'draft' | 'published'
  id?: string

  setStep: (step: number) => void
  addPhotos: (newPhotos: Blob[]) => void
  removePhoto: (photoToRemove: Blob) => void
  removeMainPhoto: () => void
  removeCroppedMainPhoto: () => void
  setMainPhoto: (photo: Blob | null) => void
  setCroppedMainPhoto: (croppedPhoto: Blob | null) => void
  setCategories: (categories: Tag[]) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setStatus: (status: 'draft' | 'published') => void
  setId: (id: string) => void

  setToDefault: () => void

  isStepValid: () => boolean
}

const useArtworkStore = create<ArtworkState>((set, get) => ({
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
  removePhoto: (photoToRemove) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo !== photoToRemove),
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
        return false
      default:
        return false
    }
  },
}))

export default useArtworkStore

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

export function fileUrl(url: string | null | undefined) {
  if (!url) return undefined
  const modifiedUrl = url.replace('public', '')
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${modifiedUrl}`
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = (error) => reject(error)
  })
}

export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  rotation: number = 0
): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not create canvas context')
  }

  canvas.width = crop.width
  canvas.height = crop.height

  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    -crop.width / 2,
    -crop.height / 2,
    crop.width,
    crop.height
  )
  ctx.restore()

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png')
  })
}

export function getUrlFromBlob(blob: Blob | null): string {
  if (!blob) return ''
  return URL.createObjectURL(blob)
}

// sanity/lib/image.ts
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

// Helper untuk mengubah data gambar Sanity jadi URL asli
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: any) => {
  return builder.image(source)
}
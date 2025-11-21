// sanity/lib/client.ts
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Kalau true, data di-cache (cepat). Kalau false, data selalu fresh (realtime).
})
// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType' // <-- Import file tadi

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType], // <-- Masukkan ke dalam array ini
}
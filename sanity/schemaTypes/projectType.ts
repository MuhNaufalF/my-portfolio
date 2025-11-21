// sanity/schemaTypes/projectType.ts
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'My Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Project',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Link URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          // Kita pisah jadi dua item berbeda di sini:
          {title: 'UI/UX Design', value: 'uiux'},
          {title: 'Graphic Design', value: 'graphic'}, 
          
          // Sisanya tetap sama
          {title: 'Web Development', value: 'web'},
          {title: 'Photography', value: 'photo'},
          {title: 'Videography', value: 'video'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true}, // Hotspot biar bisa crop titik fokus foto
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
    }),
    defineField({
      name: 'projectLink',
      title: 'Link Luar (Figma/YouTube/Github)',
      type: 'url',
    }),
  ],
})
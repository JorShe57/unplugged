import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Unplugged',

  projectId: 'j0gcj17s',
  dataset: 'new',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
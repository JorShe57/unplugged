import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'beer',
  title: 'Beer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'abv',
      title: 'ABV (%)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(20),
    }),
    defineField({
      name: 'ibu',
      title: 'IBU',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'IPA', value: 'IPA' },
          { title: 'Lager', value: 'Lager' },
          { title: 'Stout', value: 'Stout' },
          { title: 'Wheat', value: 'Wheat' },
          { title: 'Sour', value: 'Sour' },
          { title: 'Pilsner', value: 'Pilsner' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Beer Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
  ],
}); 
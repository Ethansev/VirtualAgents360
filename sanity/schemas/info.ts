import { z } from 'zod';

export const info: Page = {
  name: 'info',
  title: 'Info',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline', icon: () => 'U' },
            ],
          },
        },
      ],
    },
  ],
};
// TODO: Revise this schema
const PageSchema = z.object({
  name: z.string(),
  title: z.string(),
  type: z.string(),
  fields: z.array(
    z.object({
      name: z.string(),
      title: z.string(),
      type: z.string(),
      of: z
        .array(
          z.object({
            type: z.string(),
            marks: z.object({
              decorators: z
                .array(
                  z.object({
                    title: z.string(),
                    value: z.string(),
                    icon: z.function().optional(),
                  }),
                )
                .optional(),
            }),
          }),
        )
        .optional(),
    }),
  ),
});

type Page = z.infer<typeof PageSchema>;

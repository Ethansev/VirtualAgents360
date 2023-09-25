import { defineArrayMember, defineField, defineType } from 'sanity';
import { z } from 'zod';
// transaction type - real estate or mortgage
// created date
// last updated date
// agent

export const transactions = defineType({
  name: 'transactions',
  title: 'Transactions (Devs)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline', icon: () => 'U' },
              { title: 'Highlight', value: 'highlight', icon: () => 'H' },
              // the icons can also take a jsx component as a value
            ],
            // annotations: [],
          },
        }),
      ],
    }),
  ],
});

// TODO: fix these zod schemas to be inline with the sanity schemas
export const transactionSchema = z.object({
  body: z.array(z.any()),
  title: z.string(),
  _createdAt: z.string(),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _updatedAt: z.string(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;

// export interface Transaction {
//   _type: 'transaction';
//   _createdAt: string;
//   title: string;
//   body: any[];
// }

// export const transactionZ = z.object({
//   _id: z.string(),
//   title: z.string().nullable(),
//   body: z.array(),
// });

// export type TransactionDocument = z.infer<typeof transactionZ>;

// export const transactionsZ = z.array(transactionZ);

// const trasactionsSchema = z.object({
//   name: z.string(),
//   title: z.string(),
//   type: z.string(),
//   fields: z.array(
//     z.object({
//       name: z.string(),
//       title: z.string(),
//       type: z.string(),
//       of: z
//         .array(
//           z.object({
//             type: z.string(),
//             marks: z.object({
//               decorators: z
//                 .array(
//                   z.object({
//                     title: z.string(),
//                     value: z.string(),
//                     icon: z.function().optional(),
//                   }),
//                 )
//                 .optional(),
//             }),
//           }),
//         )
//         .optional(),
//     }),
//   ),
//   _type: z.string(),
//   _id: z.string(),
// });

// export type TransactionsSchema = z.infer<typeof trasactionsSchema>;

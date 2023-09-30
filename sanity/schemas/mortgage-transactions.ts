import { defineArrayMember, defineField, defineType } from 'sanity';
import { z } from 'zod';
// transaction type - real estate or mortgage
// transaction stages per type
// created date
// last updated date
// agent

export const mortgageTransactions = defineType({
  name: 'mortgageTransactions',
  title: 'Mortgage Transactions (Devs)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    // defineField({
    //   name: 'transactionTypes',
    //   title: 'Transaction Types',
    //   type: 'object',
    // }),
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({
    //       type: 'block',
    //       styles: [
    //         { title: 'Normal', value: 'normal' },
    //         { title: 'H1', value: 'h1' },
    //         { title: 'H2', value: 'h2' },
    //         { title: 'H3', value: 'h3' },
    //         { title: 'H4', value: 'h4' },
    //         { title: 'Quote', value: 'blockquote' },
    //       ],
    //       marks: {
    //         decorators: [
    //           { title: 'Strong', value: 'strong' },
    //           { title: 'Emphasis', value: 'em' },
    //           { title: 'Code', value: 'code' },
    //           { title: 'Underline', value: 'underline', icon: () => 'U' },
    //           { title: 'Highlight', value: 'highlight', icon: () => 'H' },
    //           // the icons can also take a jsx component as a value
    //         ],
    //         // annotations: [],
    //       },
    //     }),
    //   ],
    // }),
  ],
});

// TODO: fix these zod schemas to be inline with the sanity schemas
export const mortgageTransactionSchema = z.object({
  // body: z.array(z.any()),
  title: z.string(),
  updatedAt: z.date(),
  _createdAt: z.string(),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _updatedAt: z.string(),
});

export type MortgageTransactionSchema = z.infer<typeof mortgageTransactionSchema>;

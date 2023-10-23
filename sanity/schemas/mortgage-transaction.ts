import { defineArrayMember, defineField, defineType } from '@sanity-typed/types';
import { z } from 'zod';

const mortgageTransactionStageList = [
  'addPropertyInformation',
  'newTransactionRegistration',
  'addChange',
  'edmDocumentUpload',
  'instructionToPayCommission',
  'commissionDisbursement',
] as const;
const mortgageTransactionStage = z.enum(mortgageTransactionStageList);
export type MortgageTransactionStage = z.infer<typeof mortgageTransactionStage>;

const transactionStatusList = ['pending', 'approved', 'needs_attention'] as const;
const transactionStatus = z.enum(transactionStatusList);
export type TransactionStatus = z.infer<typeof transactionStatus>;

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
      name: 'agent',
      title: 'Agent',
      type: 'string',
      validation: (Rule) => Rule.required().error('Agent is required'),
    }),
    // defineField({
    //   name: 'updatedAt',
    //   title: 'Updated At',
    //   type: 'datetime',
    // }),
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

export const mortgageTransactionSchema = z.object({
  title: z.string(),
  agent: z.string(),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type MortgageTransaction = z.infer<typeof mortgageTransactionSchema>;

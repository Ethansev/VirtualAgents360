import { defineField, defineType } from 'sanity';
import { z } from 'zod';
import { realEstateTransactionStageTypes, statusTypes } from './models';
// transaction type - real estate or mortgage
// transaction stages per type
// created date
// last updated date
// agent

export const realEstateTransactions = defineType({
  name: 'realEstateTransactions',
  title: 'Real Estate Transactions (Devs)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subjectProperty',
      title: 'Subject Property',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: statusTypes.map(({ title, value }) => ({ title, value })),
      },
    }),
    defineField({
      name: 'transactionStage',
      title: 'Transaction Stage',
      type: 'string',
      options: {
        list: realEstateTransactionStageTypes.map(({ title, value }) => ({ title, value })),
      },
    }),
    // should define my stages and the fields per stage
    // defineField({}),
  ],
});

const realEstateTransactionSchema = z.object({
  title: z.string(),
  subjectProperty: z.string(),
  status: z.union([z.literal('pending'), z.literal('approved'), z.literal('needsAttention')]),
  transactionStage: z.union([
    z.literal('addPropertyInformation'),
    z.literal('newTransactionRegistration'),
    z.literal('addChange'),
    z.literal('EDMDocumentUpload'),
    z.literal('instructionToPayCommission'),
    z.literal('commissionDisbursement'),
  ]),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type RealEstateTransactionSchema = z.infer<typeof realEstateTransactionSchema>;

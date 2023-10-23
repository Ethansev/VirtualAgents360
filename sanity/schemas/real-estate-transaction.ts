// import { defineField, defineType } from 'sanity';
import { defineType, defineField, defineArrayMember } from '@sanity-typed/types';
import { z } from 'zod';
import {
  addPropertyInformationFields,
  realEstateTransactionStage,
  realEstateTransactionStageList,
  transactionStatus,
  transactionStatusList,
} from './real-estate-transaction.types';

// TODO: finish real estate transaction fields for each stage
// sanity schema
export const realEstateTransactions = defineType({
  name: 'realEstateTransactions',
  title: 'Real Estate Transactions (Devs)',
  type: 'document',
  fields: [
    defineField({
      name: 'agent',
      title: 'Agent',
      type: 'string',
      validation: (Rule) => Rule.required().error('Agent is required'),
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
        list: transactionStatusList.map((status) => status),
      },
    }),
    defineField({
      name: 'transactionStage',
      title: 'Transaction Stage',
      type: 'string',
      options: {
        list: realEstateTransactionStageList.map((stage) => stage),
      },
    }),
    defineField({
      name: 'addProperty Information',
      title: 'Add Property Information',
      type: 'object',
      fields: [
        defineField({
          name: 'propertyType',
          title: 'Property Type',
          type: 'string',
        }),
        defineField({
          name: 'propertyAddress',
          title: 'Property Address',
          type: 'string',
        }),
      ],
    }),
  ],
});

// zod object and typescript type
const realEstateTransactionSchema = z.object({
  agent: z.string(),
  subjectProperty: z.string(),
  // status: z.union([z.literal('pending'), z.literal('approved'), z.literal('needsAttention')]),
  status: transactionStatus,
  // transactionStage: z.union([
  //   z.literal('addPropertyInformation'),
  //   z.literal('newTransactionRegistration'),
  //   z.literal('addChange'),
  //   z.literal('edmDocumentUpload'),
  //   z.literal('instructionToPayCommission'),
  //   z.literal('commissionDisbursement'),
  // ]),
  transactionStage: realEstateTransactionStage,
  addPropertyInformation: addPropertyInformationFields,
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type RealEstateTransaction = z.infer<typeof realEstateTransactionSchema>;

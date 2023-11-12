// import { defineField, defineType } from 'sanity';
import { defineField, defineType } from '@sanity-typed/types';
import {
  realEstateTransactionStageList,
  transactionStatusList,
} from './real-estate-transaction.types';

// TODO: finish real estate transaction fields for each stage
// sanity schema
export const realEstateTransactionsSchema = defineType({
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
      validation: (Rule) => Rule.required().error('Status is required'),
      options: {
        list: transactionStatusList.map((status) => status),
      },
    }),
    defineField({
      name: 'stage',
      title: 'Stage',
      type: 'string',
      validation: (Rule) => Rule.required().error('Stage is required'),
      options: {
        list: [...realEstateTransactionStageList],
        // list: [
        //   { title: 'Add Property Information', value: 'addPropertyInformation' },
        //   { title: 'New Transaction Registration', value: 'newTransactionRegistration' },
        //   { title: 'Add Change', value: 'addChange' },
        //   { title: 'EDM Document Upload', value: 'edmDocumentUpload' },
        //   { title: 'Instruction To Pay Commission', value: 'instructionToPayCommission' },
        //   { title: 'Commission Disbursement', value: 'commissionDisbursement' },
        // ],
      },
    }),
    defineField({
      name: 'addPropertyInformation',
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
    defineField({
      name: 'newTransactionRegistration',
      title: 'New Transaction Registration',
      type: 'object',
      fields: [
        defineField({
          name: 'transactionType',
          title: 'Transaction Type',
          type: 'string',
        }),
        // defineField({
        //   name: '',
        //   title: '',
        //   type: 'string',
        // }),
      ],
    }),
  ],
});

// const realEstateTransactionSchema = z.object({
//   agent: z.string(),
//   subjectProperty: z.string(),
//   status: transactionStatus,
//   transactionStage: realEstateTransactionStage,
//   addPropertyInformation: addPropertyInformationFields,
//   _id: z.string(),
//   _rev: z.string(),
//   _type: z.string(),
//   _createdAt: z.string(),
//   _updatedAt: z.string(),
// });
// export type RealEstateTransaction = z.infer<typeof realEstateTransactionSchema>;

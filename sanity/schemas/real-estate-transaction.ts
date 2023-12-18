import { defineField, defineType } from '@sanity-typed/types';
import {
  realEstateTransactionStageList,
  transactionStatusList,
} from './real-estate-transaction.types';

// TODO: check if sanity will give me types for the option list
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
          name: 'agentAOR',
          title: 'Agent Current AOR',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'propertyAddress',
          title: 'propertyAddress',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
          // options: {
          //   list: [], // TODO: list all states
          // },
        }),
        defineField({
          name: 'zipcode',
          title: 'Zipcode',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'clientEmail',
          title: 'Client Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'clientFirstName',
          title: 'Client First Name',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'clientMiddleName',
          title: 'clientMiddleName',
          type: 'string',
        }),
        defineField({
          name: 'clientLastName',
          title: 'clientLastName',
          validation: (Rule) => Rule.required().error('State is required'),
          type: 'string',
        }),
        defineField({
          name: 'propertyType',
          title: 'Property Type',
          type: 'string', // make a dropdown
          options: {
            list: [
              'SFR',
              'Condo',
              'PUD',
              'Town home',
              '2-4 Units',
              'Residential Income',
              'High Rise Condo',
              'Commercial',
              'Manufactured',
              'Vacant Lot',
              'Other',
            ],
          },
        }),
        defineField({
          name: 'transactionType',
          title: 'Transaction Type',
          type: 'string',
          options: {
            list: [
              'Real Estate - Seller Representation',
              'Real Estate - Buyer Representation',
              'Lease - Landlord Represetation',
              'Lease - Tenant Representation',
              'Other',
            ],
          },
        }),
        defineField({
          name: 'primaryAgent',
          title: 'Primary Agent',
          type: 'string',
          validation: (Rule) => Rule.required().error('State is required'),
        }),
        defineField({
          name: 'coopAgent1',
          title: 'Co-op Agent',
          type: 'string',
        }),
        defineField({
          name: 'coopAgent2',
          title: 'Co-op Agent',
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
        defineField({
          name: '',
          title: '',
          type: 'string',
        }),
        defineField({
          name: '',
          title: '',
          type: 'string',
        }),
        defineField({
          name: '',
          title: '',
          type: 'string',
        }),
        defineField({
          name: '',
          title: '',
          type: 'string',
        }),
      ],
    }),
  ],
});

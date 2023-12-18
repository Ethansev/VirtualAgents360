import { defineField, defineType } from '@sanity-typed/types';
import { mortgageTransactionStageList } from './mortgage-transaction.types';
import { transactionStatusList } from './real-estate-transaction.types';

export const mortgageTransactionsSchema = defineType({
  name: 'mortgageTransactions',
  title: 'Mortgage Transactions (Devs)',
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
      name: 'stage',
      title: 'Stage',
      type: 'string',
      options: {
        list: mortgageTransactionStageList.map((stage) => stage),
      },
    }),
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

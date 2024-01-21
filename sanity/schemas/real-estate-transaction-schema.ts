import { defineField, defineType } from '@sanity-typed/types';
import {
    propertyType,
    realEstateTransactionStageList,
    transactionStatusList,
    transactionType,
} from './real-estate-transaction.types';

// TODO: check if sanity will give me types for the option list
// sanity schema
export const realEstateTransactionSchema = defineType({
    name: 'realEstateTransaction',
    title: 'Real Estate Transactions (Devs)',
    type: 'document',
    fields: [
        defineField({
            name: 'subjectProperty',
            title: 'Subject Property',
            type: 'string',
        }),

        defineField({
            name: 'agent',
            title: 'Agent',
            type: 'string',
            validation: (Rule) => Rule.required().error('Agent is required'),
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
            },
        }),

        // TODO: define the real estate transaction types
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [],
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
                    validation: (Rule) => Rule.required().error('Agent Current AOR is required'),
                }),
                defineField({
                    name: 'propertyAddress',
                    title: 'Property Address',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Property Address is required'),
                }),
                defineField({
                    name: 'city',
                    title: 'City',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('City is required'),
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
                    validation: (Rule) => Rule.required().error('Zipcode is required'),
                }),

                defineField({
                    name: 'clientEmail',
                    title: 'Client Email Address',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Client Email Address is required'),
                }),

                defineField({
                    name: 'clientFirstName',
                    title: 'Client First Name',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Client First Name is required'),
                }),

                defineField({
                    name: 'clientMiddleName',
                    title: 'clientMiddleName',
                    type: 'string',
                }),

                defineField({
                    name: 'clientLastName',
                    title: 'clientLastName',
                    validation: (Rule) => Rule.required().error('Client Last Name is required'),
                    type: 'string',
                }),

                defineField({
                    name: 'propertyType',
                    title: 'Property Type',
                    type: 'string', // make a dropdown
                    validation: (Rule) => Rule.required().error('Property Type is required'),
                    options: {
                        list: propertyType,
                    },
                }),

                defineField({
                    name: 'transactionType',
                    title: 'Transaction Type',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Transaction Type is required'),
                    options: {
                        list: transactionType,
                    },
                }),

                defineField({
                    name: 'primaryAgent',
                    title: 'Primary Agent',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Primary Agent is required'),
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

        // TODO: figure out how to do the data schema for this nested form
        defineField({
            name: 'transactionRegistration',
            title: 'Transaction Registration',
            type: 'object',
            fields: [
                defineField({
                    name: 'transactionType',
                    title: 'Transaction Type',
                    type: 'string',
                }),

                defineField({
                    name: 'newListingSale',
                    title: 'New Listing Sale',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'listingDate',
                            title: 'Listing Date',
                            type: 'date',
                        }),

                        defineField({
                            name: 'expirationDate',
                            title: 'expirationDate',
                            type: 'date',
                        }),

                        defineField({
                            name: 'mlsNumber',
                            title: 'MLS Number',
                            type: 'number',
                        }),

                        defineField({
                            name: 'listingPrice',
                            title: 'Listing Price',
                            type: 'number',
                        }),

                        defineField({
                            name: 'listingOfficeCompPercentage',
                            title: 'Listing Office Comp % ',
                            type: 'number',
                        }),

                        defineField({
                            name: 'listingOfficeCompAmount',
                            title: 'Listing Office Comp $',
                            type: 'number',
                        }),

                        defineField({
                            name: 'sellersFirstName',
                            title: "Seller's First Name",
                            type: 'string',
                        }),

                        defineField({
                            name: 'sellersLastName',
                            title: "Seller's Last Name",
                            type: 'string',
                        }),

                        defineField({
                            name: 'sellersEmailAddress',
                            title: "Seller's Email Address",
                            type: 'string',
                        }),

                        defineField({
                            name: 'specialInstructions',
                            title: 'Special Instructions',
                            type: 'string',
                        }),
                    ],
                }),

                // defineField({
                //   name: 'newListingLease',
                //   title: 'New Listing Lease',
                //   type: 'object',
                //   fields: [
                //     defineField({
                //       name: '',
                //       title: '',
                //       type: '',
                //     }),
                //   ],
                // }),

                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
            ],
        }),

        defineField({
            name: 'addChange',
            title: 'Add Change',
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
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
            ],
        }),

        defineField({
            name: 'edmDocumentUpload',
            title: 'EDM Document Upload',
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
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
            ],
        }),

        defineField({
            name: 'instructionToPayCommission',
            title: 'Instruction To Pay Commission',
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
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
            ],
        }),

        defineField({
            name: 'commissionDisbursement',
            title: 'Commission Disbursement',
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
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
                // defineField({
                //   name: '',
                //   title: '',
                //   type: 'string',
                // }),
            ],
        }),
    ],
});

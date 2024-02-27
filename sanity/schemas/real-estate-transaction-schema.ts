import { defineField, defineType } from '@sanity-typed/types';
import {
    propertyType,
    realEstateTransactionStageList,
    transactionStatusList,
    transactionType,
} from './real-estate-transaction.types';

// TODO: decide between multiple schemas or tree of the same one?
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

        defineField({
            name: 'transactionRegistration',
            title: 'Transaction Registration',
            type: 'object',
            groups: [
                {
                    name: 'newListingSale',
                    title: 'New Listing Sale',
                    hidden: ({ value }) => value?.transactionRegistrationType !== 'newListingSale',
                },
                {
                    name: 'newListingLease',
                    title: 'New Listing Lease',
                    hidden: ({ value }) => value?.transactionRegistrationType !== 'newListingLease',
                },
                {
                    name: 'openEscrowListing',
                    title: 'Open Escrow Listing',
                    hidden: ({ value }) =>
                        value?.transactionRegistrationType !== 'openEscrowListing',
                },
                {
                    name: 'openEscrowSale',
                    title: 'Open Escrow Sale',
                    hidden: ({ value }) => value?.transactionRegistrationType !== 'openEscrowSale',
                },
            ],
            fields: [
                // TODO: define the real estate transaction types
                defineField({
                    name: 'transactionRegistrationType',
                    title: 'Transaction Registration Type',
                    type: 'string',
                    // validation: (Rule) =>
                    //     Rule.required().error('Transaction Registration type is required'),
                    group: [
                        'newListingSale',
                        'newListingLease',
                        'openEscrowListing',
                        'openEscrowSale',
                    ],
                    options: {
                        // TODO: move this list of types to the types file
                        list: [
                            {
                                title: 'New Listing Transaction - For Sale',
                                value: 'newListingSale',
                            },
                            {
                                title: 'New Listing Transaction - For Lease',
                                value: 'newListingLease',
                            },
                            {
                                title: 'Open Escrow Registration - Listing',
                                value: 'openEscrowListing',
                            },
                            { title: 'Open Escrow Registration - Sale', value: 'openEscrowSale' },
                        ],
                    },
                }),

                defineField({
                    name: 'newListingSale',
                    title: 'New Listing Sale',
                    type: 'object',
                    group: 'newListingSale',
                    hidden: ({ parent }) =>
                        parent?.transactionRegistrationType !== 'newListingSale',
                    fields: [
                        defineField({
                            name: 'listingDate',
                            title: 'Listing Date',
                            type: 'date',
                            validation: (Rule) => Rule.required().error('Listing Date is required'),
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
                    ],
                }),

                defineField({
                    name: 'newListingLease',
                    title: 'New Listing Lease',
                    type: 'object',
                    group: 'newListingLease',
                    hidden: ({ parent }) =>
                        parent?.transactionRegistrationType !== 'newListingLease',
                    // validation: (Rule) =>
                    //     Rule.custom((newListingLease, context) => {
                    //         if (context?.document?.transactionRegistration === 'newListingLease') {
                    //             return 'New Listing Lease is required';
                    //         }
                    //
                    //         return true;
                    //     }),
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
                    ],
                }),
                defineField({
                    name: 'openEscrowSale',
                    title: 'Open Escrow Sale',
                    type: 'object',
                    group: 'openEscrowSale',
                    hidden: ({ parent }) =>
                        parent?.transactionRegistrationType !== 'openEscrowSale',
                    // validation: (Rule) =>
                    //     Rule.custom((newListingLease, context) => {
                    //         if (context?.document?.transactionRegistration === 'newListingLease') {
                    //             return 'New Listing Lease is required';
                    //         }
                    //
                    //         return true;
                    //     }),
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
                    ],
                }),

                defineField({
                    name: 'openEscrowListing',
                    title: 'Open Escrow Listing',
                    type: 'object',
                    group: 'openEscrowListing',
                    hidden: ({ parent }) =>
                        parent?.transactionRegistrationType !== 'openEscrowListing',
                    // validation: (Rule) =>
                    //     Rule.custom((newListingLease, context) => {
                    //         if (context?.document?.transactionRegistration === 'newListingLease') {
                    //             return 'New Listing Lease is required';
                    //         }
                    //
                    //         return true;
                    //     }),
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
                    ],
                }),
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

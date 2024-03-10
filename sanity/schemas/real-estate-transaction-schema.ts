import { defineField, defineType } from '@sanity-typed/types';
import {
    propertyType,
    realEstateTransactionStageList,
    smartBuyComboOptions,
    smartBuyFourthOptions,
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
            name: 'propertyInformation',
            title: 'Property Information',
            type: 'object',
            // validation: (Rule) => Rule.required().error('Agent is required'),
            validation: (Rule) =>
                Rule.custom((duration, context) => {
                    return true;
                    // if (context?.document?.stage === 'addProperyInformation') {
                    //     return 'Property Information is required';
                    // }
                    // return true;
                }),
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
                    validation: (Rule) =>
                        Rule.required().error('Transaction Registration type is required'),
                    group: [
                        'newListingSale',
                        'newListingLease',
                        'openEscrowListing',
                        'openEscrowSale',
                        'openEscrowReferral',
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
                            name: 'smartBuyCombo',
                            title: 'Smart Buy Combo',
                            type: 'object',
                            validation: (Rule) =>
                                Rule.required().error('Smart Buy Combo is required'),
                            fields: [
                                defineField({
                                    name: 'first',
                                    title: 'Is your client interested in assistance with home financing?',
                                    type: 'string',
                                    options: { list: smartBuyComboOptions },
                                    validation: (Rule) =>
                                        Rule.required().error('This field is required'),
                                }),
                                defineField({
                                    name: 'second',
                                    title: 'Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?',
                                    type: 'string',
                                    options: { list: smartBuyComboOptions },
                                    validation: (Rule) =>
                                        Rule.required().error('This field is required'),
                                }),
                                defineField({
                                    name: 'third',
                                    title: 'Are you aware that the Smart-Buy-Combo program offers the benefit of additional compensation?',
                                    type: 'string',
                                    options: { list: smartBuyComboOptions },
                                    validation: (Rule) =>
                                        Rule.required().error('This field is required'),
                                }),
                                defineField({
                                    name: 'fourth',
                                    title: 'In your opinion, what are the benefits of closing both real esate and mortgage transactions under one roof?',
                                    type: 'string',
                                    options: {
                                        list: smartBuyFourthOptions,
                                    },
                                    validation: (Rule) =>
                                        Rule.required().error('This field is required'),
                                }),
                            ],
                        }),
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
                            validation: (Rule) =>
                                Rule.required().error('Expiration Date is required'),
                        }),

                        defineField({
                            name: 'mlsNumber',
                            title: 'MLS Number',
                            type: 'string',
                            validation: (Rule) => Rule.required().error('MLS Number is required'),
                        }),

                        defineField({
                            name: 'listingPrice',
                            title: 'Listing Price',
                            type: 'string', // number
                            validation: (Rule) =>
                                Rule.required().error('Listing Price is required'),
                        }),

                        defineField({
                            name: 'listingOfficeCompPercentage',
                            title: 'Listing Office Comp %',
                            type: 'string', // number
                            validation: (Rule) =>
                                Rule.required().error('Listing Office Comp % is required'),
                        }),

                        defineField({
                            name: 'listingOfficeCompAmount',
                            title: 'Listing Office Comp $',
                            type: 'string', // number
                            validation: (Rule) =>
                                Rule.required().error('Listing Office Comp $ is required'),
                        }),

                        defineField({
                            name: 'sellerFirstName',
                            title: "Seller's First Name",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Seller's First Name is required"),
                        }),

                        defineField({
                            name: 'sellerLastName',
                            title: "Seller's Last Name",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Seller's Last Name is required"),
                        }),

                        defineField({
                            name: 'sellerEmail',
                            title: "Seller's Email Address",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Seller's Email Address is required"),
                        }),

                        // TODO: figure out what to do with this checkbox field
                        defineField({
                            name: 'receivedListingAgreement',
                            title: 'A signed Listing Agreement has been obtained by agent and forwarded to ASC (checkbox)',
                            type: 'boolean',
                        }),

                        // TODO: listing agreement upload file field would go here
                        defineField({
                            name: 'specialInstructions',
                            title: 'specialInstructions',
                            type: 'string',
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
                            validation: (Rule) => Rule.required().error('Listing Date is required'),
                        }),

                        defineField({
                            name: 'expirationDate',
                            title: 'expirationDate',
                            type: 'date',
                            validation: (Rule) =>
                                Rule.required().error('Expiration Date is required'),
                        }),

                        defineField({
                            name: 'mlsNumber',
                            title: 'MLS Number',
                            type: 'string',
                            validation: (Rule) => Rule.required().error('MLS Number is required'),
                        }),

                        defineField({
                            name: 'listingPrice',
                            title: 'Listing Price',
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error('Listing Price is required'),
                        }),

                        defineField({
                            name: 'listingOfficeCompPercentage',
                            title: 'Listing Office Comp %',
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error('Liting Office Comp Percentage is required'),
                        }),

                        defineField({
                            name: 'listingOfficeCompAmount',
                            title: 'Listing Office Comp $',
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error('Listing Office Comp Amount is required'),
                        }),

                        defineField({
                            name: 'ownerFirstName',
                            title: "Owner's First Name",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Owner's First Name is required"),
                        }),

                        defineField({
                            name: 'ownerLastName',
                            title: "Owner's Last Name",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Owner's Last Name is required"),
                        }),

                        defineField({
                            name: 'ownerEmail',
                            title: "Owner's Email Address",
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error("Owner's Email Name is required"),
                        }),

                        defineField({
                            name: 'receivedListingAgreement',
                            title: 'A signed Listing Agreement has been obtained by agent and forwarded to ASC (checkbox)',
                            type: 'boolean',
                            validation: (Rule) =>
                                Rule.required().error('Received Listing Agreement is required'),
                        }),

                        // TODO: listing agreement upload file field would go here
                        defineField({
                            name: 'specialInstructions',
                            title: 'specialInstructions',
                            type: 'string',
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
                            name: 'smartBuyCombo',
                            title: 'Smart Buy Combo',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'first',
                                    title: 'Is your client interested in assistance with home financing?',
                                    type: 'string',
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'second',
                                    title: 'Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'third',
                                    title: 'Are you aware that the Smart-Buy-Combo program offers the benefit of additional compensation?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'fourth',
                                    title: 'In your opinion, what are the benefits of closing both real esate and mortgage transactions under one roof?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: {
                                        list: smartBuyFourthOptions,
                                    },
                                }),
                                // defineField({
                                //     name: 'fifth',
                                //     title: 'If representing both the seller and the buyere, select "Dual Representation"',
                                //     type: 'boolean',
                                // }),
                            ],
                        }),

                        // Trust Fund Registration - Receipt of Funds
                        defineField({
                            name: 'dateReceived',
                            title: 'Date Received',
                            type: 'date',
                        }),

                        defineField({
                            name: 'receivedFrom',
                            title: 'Received From',
                            type: 'string',
                        }),

                        defineField({
                            name: 'amount1',
                            title: 'Amount',
                            type: 'string',
                        }),
                        // TODO: move options list to types
                        defineField({
                            name: 'formOfReceipt',
                            title: 'Form of Receipt',
                            type: 'string',
                            options: {
                                list: ['Personal Check', "Cashier's Check", 'Cash', 'Other'],
                            },
                        }),

                        // Trust Fund Registration - Disbursement of Funds
                        defineField({
                            name: 'disbursementDate',
                            title: 'Disbursement Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'amount2',
                            title: 'Amount',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowCompany',
                            title: 'Escrow Company',
                            type: 'string',
                        }),
                        // TODO: move options list to types
                        defineField({
                            name: 'methodOfDisbursement',
                            title: 'Method of Disbursement',
                            type: 'string',
                            options: {
                                list: [
                                    'Funds forwarded to escrow',
                                    'Funds returned to buyer',
                                    'Other',
                                ],
                            },
                        }),

                        // Escrow Information
                        defineField({
                            name: 'openEscrowDate',
                            title: 'Open Escrow Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'estimatedClosingDate',
                            title: 'Estimated Closing date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'salePrice',
                            title: 'Sale Price $',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingOffice',
                            title: 'Listing Office',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingAgent',
                            title: 'Listing Agent',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingEmail',
                            title: 'Listing Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingPhone',
                            title: 'Listing Telephoe',
                            type: 'string',
                        }),

                        defineField({
                            name: 'escrowCompany2',
                            title: 'Escrow Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowOfficer',
                            title: 'Escrow Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowEmail',
                            title: 'Escrow Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowPhone',
                            title: 'Escrow Phone',
                            type: 'string',
                        }),

                        defineField({
                            name: 'titleCompany',
                            title: 'Title Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleOfficer',
                            title: 'Title officer/AE Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleEmail',
                            title: 'Title Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titlePhone',
                            title: 'Title Telephone Number',
                            type: 'string',
                        }),
                        defineField({
                            name: 'specialInstructions',
                            title: 'Special Instructions',
                            type: 'string',
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
                            name: 'smartBuyCombo',
                            title: 'Smart Buy Combo',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'first',
                                    title: 'Is your client interested in assistance with home financing?',
                                    type: 'string',
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'second',
                                    title: 'Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'third',
                                    title: 'Are you aware that the Smart-Buy-Combo program offers the benefit of additional compensation?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: { list: smartBuyComboOptions },
                                }),
                                defineField({
                                    name: 'fourth',
                                    title: 'In your opinion, what are the benefits of closing both real esate and mortgage transactions under one roof?',
                                    type: 'string',
                                    // TODO: update this options list
                                    options: {
                                        list: smartBuyFourthOptions,
                                    },
                                }),
                                // defineField({
                                //     name: 'fifth',
                                //     title: 'If representing both the seller and the buyer, select "Dual Representation"',
                                //     type: 'string',
                                // }),
                            ],
                        }),

                        // Escrow Information
                        defineField({
                            name: 'openEscrowDate',
                            title: 'Open Escrow Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'estimatedClosingDate',
                            title: 'Estimated Closing Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'salePrice',
                            title: 'Sale Price $',
                            type: 'string',
                        }),

                        defineField({
                            name: 'sellingOffice',
                            title: 'Selling Office',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sellingAgent',
                            title: 'Selling Agent',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sellingEmail',
                            title: 'Selling Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sellingPhone',
                            title: 'Telephone',
                            type: 'string',
                        }),

                        defineField({
                            name: 'escrowCompany',
                            title: 'Escrow Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowOfficer',
                            title: 'Escrow Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowEmail',
                            title: 'Escrow Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowPhone',
                            title: 'Telephone',
                            type: 'string',
                        }),

                        defineField({
                            name: 'titleCompany',
                            title: 'Title Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleOfficer',
                            title: 'Title Officer/AE Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleEmail',
                            title: 'Title Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titlePhone',
                            title: 'Telephone',
                            type: 'string',
                        }),
                        defineField({
                            name: 'specialInstructions',
                            title: 'Special Instructions',
                            type: 'string',
                        }),
                    ],
                }),

                defineField({
                    name: 'openEscrowReferral',
                    title: 'Open Escrow Referral',
                    type: 'object',
                    group: 'openEscrowReferral',
                    hidden: ({ parent }) =>
                        parent?.transactionRegistrationType !== 'openEscrowReferral',
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
                            name: 'openEscrowDate',
                            title: 'Open Escrow Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'estimatedClosingDate',
                            title: 'Estimated Closing Date',
                            type: 'date',
                        }),
                        defineField({
                            name: 'salePrice',
                            title: 'Sale Price $',
                            type: 'number',
                        }),

                        defineField({
                            name: 'listingOffice',
                            title: 'Listing Office',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingAgent',
                            title: 'Listing Agent',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingEmail',
                            title: 'Listing Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'listingPhone',
                            title: 'Telephone',
                            type: 'number',
                        }),

                        defineField({
                            name: 'escrowCompany',
                            title: 'Escrow Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowOfficer',
                            title: 'Escrow Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowEmail',
                            title: 'Escrow Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'escrowPhone',
                            title: 'Telephone',
                            type: 'number',
                        }),

                        defineField({
                            name: 'titleCompany',
                            title: 'Title Company',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleOfficer',
                            title: 'Title Officer/AE Officer',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titleEmail',
                            title: 'Title Email Address',
                            type: 'string',
                        }),
                        defineField({
                            name: 'titlePhone',
                            title: 'Telephone',
                            type: 'number',
                        }),
                        defineField({
                            name: 'specialInstructions',
                            title: 'Special Instructions',
                            type: 'string',
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

// I can pass data to the schema like this
// export const smartBuyComboSchema = defineField({
//     name: 'smartBuyCombo',
//     title: 'Smart Buy Combo',
//     type: 'object',
//     fields: [
//         defineField({
//             name: 'first',
//             title: 'Is your client interested in assistance with home financing?',
//             type: 'string',
//         }),
//         defineField({
//             name: 'second',
//             title: 'Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?',
//             type: 'string',
//             // TODO: update this options list
//             options: { list: ['Yes', 'No'] },
//         }),
//         defineField({
//             name: 'third',
//             title: 'Are you aware that the Smart-Buy-Combo program offers the benefit of additional compensation?',
//             type: 'string',
//             // TODO: update this options list
//             options: { list: ['Yes', 'No'] },
//         }),
//         defineField({
//             name: 'fourth',
//             title: 'In your opinion, what are the benefits of closing both real esate and mortgage transactions under one roof?',
//             type: 'string',
//             // TODO: update this options list
//             options: {
//                 list: [
//                     {
//                         title: 'The ability to manage and control existing real estate transactions',
//                         value: 'one',
//                     },
//                     {
//                         title: 'Additional Compensation',
//                         value: 'two',
//                     },
//                     {
//                         title: 'Higher retention of clients by being able to offer refinance and equity loan services',
//                         value: 'three',
//                     },
//                     {
//                         title: 'All of the above',
//                         value: 'fourth',
//                     },
//                 ],
//             },
//         }),
//     ],
// });

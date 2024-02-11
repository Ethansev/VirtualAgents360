import { SanityValues } from '@/sanity.config';

// TODO: move this and mortgage to separate transaction types
export type RealEstateTransactionStage =
    | 'addPropertyInformation'
    | 'transactionRegistration'
    | 'addChange'
    | 'edmDocumentUpload'
    | 'instructionToPayCommission'
    | 'commissionDisbursement';
export const realEstateTransactionStageList: {
    title: string;
    value: RealEstateTransactionStage;
}[] = [
    { title: 'Add Property Information', value: 'addPropertyInformation' },
    { title: 'New Transaction Registration', value: 'transactionRegistration' },
    { title: 'Add Change', value: 'addChange' },
    { title: 'EDM Document Upload', value: 'edmDocumentUpload' },
    { title: 'Instruction To Pay Commission', value: 'instructionToPayCommission' },
    { title: 'Commission Disbursement', value: 'commissionDisbursement' },
];

// TODO: add new statuses for administrators
export type TransactionStatus = 'pending' | 'approved' | 'needsAttention';
export const transactionStatusList: { title: string; value: TransactionStatus }[] = [
    { title: 'Pending', value: 'pending' },
    { title: 'Approved', value: 'approved' },
    { title: 'Needs Attention', value: 'needsAttention' },
];

// Add New Property Information
export const propertyTypeList = [
    'sfr',
    'condo',
    'pud',
    'townHome',
    '2-4Units',
    'residentialIncome',
    'highRiseCondo',
    'commercial',
    'manufactured',
    'vacantLot',
    'other',
] as const;
export const propertyType = [
    { title: 'SFR', value: 'sfr' },
    { title: 'Condo', value: 'condo' },
    { title: 'PUD', value: 'pud' },
    { title: 'Town home', value: 'townHome' },
    { title: '2-4 Units', value: '2-4Units' },
    { title: 'Residential Income', value: 'residentialIncome' },
    { title: 'High Rise Condo', value: 'highRiseCondo' },
    { title: 'Commercial', value: 'commercial' },
    { title: 'Manufactured', value: 'manufactured' },
    { title: 'Vacant Lot', value: 'vacantLot' },
    { title: 'Other', value: 'other' },
];

export const transactionTypeList = [
    'realEstateSellerRepresentation',
    'realEstateBuyerRepresentation',
    'leaseLandlordRepresentation',
    'leaseTenantRepresentation',
    'other',
] as const; // treats this as a readonly tuple instead of an array
export const transactionType = [
    { title: 'Real Estate - Seller Representation', value: 'realEstateSellerRepresentation' },
    { title: 'Real Estate - Buyer Representation', value: 'realEstateBuyerRepresentation' },
    { title: 'Lease - Landlord Representation', value: 'leaseLandlordRepresentation' },
    { title: 'Lease - Tenant Representation', value: 'leaseTenantRepresentation' },
    { title: 'Other', value: 'other' },
];

export const agentAOR = [
    {
        value: 'West San Gabriel Valley Association of Realtors',
        title: 'West San Gabriel Valley Association of Realtors',
    },
    {
        value: 'Orange County Association of Realtors',
        title: 'Orange County Association of Realtors',
    },
    {
        value: 'Beverly Hills / Greater LA Association of Realtors',
        title: 'Beverly Hills / Greater LA Association of Realtors',
    },
    {
        value: 'Tri-Counties Association of Realtors',
        title: 'Tri-Counties Association of Realtors',
    },
    {
        value: 'Rancho Southeasy Association of Realtors',
        title: 'Rancho Southeasy Association of Realtors',
    },
    {
        value: 'Greater Antelope Valley Association of Realtors',
        title: 'Greater Antelope Valley Association of Realtors',
    },
    { value: 'Other', title: 'Other' },
];

export type RealEstateTransaction = SanityValues['realEstateTransaction'];
export type AddPropertyInformation = NonNullable<RealEstateTransaction['addPropertyInformation']>;
export type TransactionRegistration = NonNullable<RealEstateTransaction['transactionRegistration']>;
export type AddChange = NonNullable<RealEstateTransaction['addChange']>;
export type EDMDocumentUpload = NonNullable<RealEstateTransaction['edmDocumentUpload']>;
export type InstructionToPayCommission = NonNullable<
    RealEstateTransaction['instructionToPayCommission']
>;
export type CommissionDisbursemennt = NonNullable<RealEstateTransaction['commissionDisbursement']>;

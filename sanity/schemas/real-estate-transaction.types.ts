import { SanityValues } from '@/sanity.config';

// TODO: move this and mortgage to separate transaction types
export type RealEstateTransactionStage =
  | 'addPropertyInformation'
  | 'newTransactionRegistration'
  | 'addChange'
  | 'edmDocumentUpload'
  | 'instructionToPayCommission'
  | 'commissionDisbursement';
export const realEstateTransactionStageList: {
  title: string;
  value: RealEstateTransactionStage;
}[] = [
  { title: 'Add Property Information', value: 'addPropertyInformation' },
  { title: 'New Transaction Registration', value: 'newTransactionRegistration' },
  { title: 'Add Change', value: 'addChange' },
  { title: 'EDM Document Upload', value: 'edmDocumentUpload' },
  { title: 'Instruction To Pay Commission', value: 'instructionToPayCommission' },
  { title: 'Commission Disbursement', value: 'commissionDisbursement' },
];

export type TransactionStatus = 'pending' | 'approved' | 'needsAttention';
export const transactionStatusList: { title: string; value: TransactionStatus }[] = [
  { title: 'Pending', value: 'pending' },
  { title: 'Approved', value: 'approved' },
  { title: 'Needs Attention', value: 'needsAttention' },
];

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

export type RealEstateTransaction = SanityValues['realEstateTransaction'];
export type AddPropertyInformation = NonNullable<RealEstateTransaction['addPropertyInformation']>;

import { z } from 'zod';

// TODO: find a better way to do this or figure out how to infer sanity types
export const realEstateTransactionStageList = [
  'addPropertyInformation',
  'newTransactionRegistration',
  'addChange',
  'edmDocumentUpload',
  'instructionToPayCommission',
  'commissionDisbursement',
] as const;
export const realEstateTransactionStage = z.enum(realEstateTransactionStageList);
export type RealEstateTransactionStage = z.infer<typeof realEstateTransactionStage>;

export const transactionStatusList = ['pending', 'approved', 'needs_attention'] as const;
export const transactionStatus = z.enum(transactionStatusList);
export type TransactionStatus = z.infer<typeof transactionStatus>;

export const addPropertyInformationFields = z.object({
  propertyType: z.string(),
  propertyAddress: z.string(),
});
export type AddPropertyInformation = z.infer<typeof addPropertyInformationFields>;

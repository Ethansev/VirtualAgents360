import { SanityValues } from '@/sanity.config';
import { z } from 'zod';

// TODO: move this and mortgage to separate transaction types
export const realEstateTransactionStageList = [
  'addPropertyInformation',
  'newTransactionRegistration',
  'addChange',
  'edmDocumentUpload',
  'instructionToPayCommission',
  'commissionDisbursement',
] as const;
const realEstateTransactionStage = z.enum(realEstateTransactionStageList);
export type RealEstateTransactionStage = z.infer<typeof realEstateTransactionStage>;

export const transactionStatusList = ['pending', 'approved', 'needs_attention'] as const;
const transactionStatus = z.enum(transactionStatusList);
export type TransactionStatus = z.infer<typeof transactionStatus>;

export type RealEstateTransaction = SanityValues['realEstateTransactions'];

export type AddPropertyInformation = NonNullable<
  RealEstateTransaction['addPropertyInformation']
>;

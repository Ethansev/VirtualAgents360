import { SanityValues } from '@/sanity.config';
import { z } from 'zod';

export const mortgageTransactionStageList = [
  'addPropertyInformation',
  'newTransactionRegistration',
  'addChange',
  'edmDocumentUpload',
  'instructionToPayCommission',
  'commissionDisbursement',
] as const;
const mortgageTransactionStage = z.enum(mortgageTransactionStageList);
export type MortgageTransactionStage = z.infer<typeof mortgageTransactionStage>;

const transactionStatusList = ['pending', 'approved', 'needs_attention'] as const;
const transactionStatus = z.enum(transactionStatusList);
export type TransactionStatus = z.infer<typeof transactionStatus>;

export type MortgageTransaction = SanityValues['mortgageTransactions'];

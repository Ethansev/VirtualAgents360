// can separate into a repository file if needed, but for now, it's fine

import { client } from '@/sanity/lib/client';
import { TransactionSchema, transactionSchema } from '@/sanity/schemas/transactions';

export const transactionsServices = {
  getTransactions: async () => {
    const query = `*[_type == "transactions"]`;
    const transactions: TransactionSchema[] = await client.fetch(query);
    // transactions ? transactionSchema.parse(transactions) : null;
    return transactions;
  },
};

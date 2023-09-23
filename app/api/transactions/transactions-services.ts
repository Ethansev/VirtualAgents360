import { client } from '@/sanity/lib/client';
import { TransactionSchema, transactionSchema } from '@/sanity/schemas/transactions';

export const transactionsServices = {
  getAllTransactions: async () => {
    const query = `*[_type == "transactions"]`;
    const transactions: TransactionSchema[] = await client.fetch(query);
    return transactions;
  },
};

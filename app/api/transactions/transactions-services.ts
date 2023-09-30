import { client } from '@/sanity/lib/client';
import { RealEstateTransactionSchema } from '@/sanity/schemas/real-estate-transactions';
import { MortgageTransactionSchema } from '@/sanity/schemas/mortgage-transactions';

export const transactionsServices = {
  getAllRealEstateTransactions: async () => {
    const query = `*[_type == "realEstateTransactions"]`;
    const transactions: RealEstateTransactionSchema[] = await client.fetch(query);
    return transactions;
  },

  getAllMortgageTransactions: async () => {
    // const query = `*[_type == "mortgageTransactions"]`;
    // const transactions: MortgageTransactionSchema[] = await client.fetch(query);
    // return transactions;
    return await client.fetch('*[_type=="mortgageTransactions"]');
  },
};

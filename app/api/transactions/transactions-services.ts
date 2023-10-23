import { client } from '@/sanity/lib/client';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction';

export const transactionsServices = {
  getAllRealEstateTransactions: async () => {
    const query = `*[_type == "realEstateTransactions"]`;
    const transactions: RealEstateTransaction[] = await client.fetch(query);
    return transactions;
  },

  getAllMortgageTransactions: async () => {
    const query = `*[_type == "mortgageTransactions"]`;
    try {
      const transactions: MortgageTransaction[] = await client.fetch(query);
      return transactions;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

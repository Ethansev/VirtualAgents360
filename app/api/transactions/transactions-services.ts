import { FormSchema } from '@/app/(transactions)/real-estate/components/real-estate-forms/new-property-information';
import { client } from '@/sanity/lib/client';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';

export const transactionServices = {
  getAllRealEstateTransactions: async () => {
    const query = `*[_type == "realEstateTransactions"]`;
    try {
      const transactions: RealEstateTransaction[] = await client.fetch(query);
      return transactions;
    } catch (err) {
      console.error(err);
      throw err;
    }
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

  // TODO: remove FormSchema and find a better way to type this
  postRealEstateTrasaction: async (formData: FormSchema) => {
    const transaction = {
      ...formData,
      _type: 'RealEstateTransaction',
    };
    // FIXME: get post request to sanity to work
    // try {
    //   // const transactions: RealEstateTransaction[] = await client.fetch(query);
    //   const res = client.create(transaction);

    //   // return transactions;
    // } catch (err) {
    //   console.error(err);
    //   throw err;
    // }
  },
};

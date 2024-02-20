import { FormSchema } from '@/app/(transactions)/real-estate/components/real-estate-forms/new-property-information';
import { client } from '@/sanity/lib/client';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';

// TODO: probably just remove the outer object and export the functions directly
export const transactionService = {
    getAllRealEstateTransactions: async () => {
        const query = `*[_type == "realEstateTransaction"]`;
        try {
            const transactions: RealEstateTransaction[] = await client.fetch(query);
            return transactions;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    getRealEstateTransactionById: async (id: string) => {
        const query = `*[_type == "realEstateTransaction" && _id == $id]`;
        try {
            const transactions: RealEstateTransaction[] = await client.fetch(query, { id });
            return transactions[0];
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // TODO: remove FormSchema and find a better way to type this
    // TODO: add resend service here
    createRealEstateTransaction: async (formData: FormSchema) => {
        // also need: agent, subject property, status, stage
        const transaction = {
            ...formData,
            _type: 'realEstateTransaction',
        };

        try {
            // const transactions: RealEstateTransaction[] = await client.fetch(query);
            const res = await client.create(transaction);
            console.log('here is the sanity response', res);
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    updateRealEstateTransaction: async (formData: RealEstateTransaction) => {
        console.log('here is the formData from update real estate transaction: ', formData);

        try {
            console.log('printing formData', formData);
            console.log('here is formdata type: ', typeof formData);
            // make a request to the sanity endpoint here
            const res = await client.patch(formData._id).set(formData).commit();
            console.log('here is the sanity response', res);
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    getAllMortgageTransactions: async () => {
        const query = `*[_type == "mortgageTransaction"]`;
        try {
            const transactions: MortgageTransaction[] = await client.fetch(query);
            return transactions;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};

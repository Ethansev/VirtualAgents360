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
            addPropertyInformation: {
                ...formData,
            },
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

    // TODO: add email service and better error handling
    updateRealEstateTransaction: async (formData: RealEstateTransaction) => {
        try {
            const res = await client.patch(formData._id).set(formData).commit();
            console.log('here is the sanity response', res);
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    deleteRealEstateTransaction: async (id: string) => {
        try {
            const res = await client.delete(id);
            console.log('here is the sanity response', res);

            // TODO: return a success object
            // if (res.documentIds[0] === id) {
            //     return true;
            // }
            return res;
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

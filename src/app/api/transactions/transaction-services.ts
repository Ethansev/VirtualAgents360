import { client } from '@/sanity/lib/client';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';

// TODO: create a function that returns transactions of a particular user

/**
 * @description Returns all real estate transactions
 * @returns Array of RealEstateTransaction objects
 *
 * */
export const getAllRealEstateTransactions = async () => {
    // 'use server';
    console.log('running on server...');
    const query = `*[_type == "realEstateTransaction"]`;
    try {
        const transactions: RealEstateTransaction[] = await client.fetch(query);
        return transactions;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export async function getRealEstateTransactionById(id: string) {
    const query = `*[_type == "realEstateTransaction" && _id == $id]`;
    try {
        const transactions: RealEstateTransaction[] = await client.fetch(query, { id });
        return transactions[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// TODO: remove FormSchema and find a better way to type this
// TODO: add resend service here
export async function createRealEstateTransaction(formData: Partial<RealEstateTransaction>) {
    // agent, subject property, status, stage are passed as part of formData
    const transaction = {
        ...formData,
        _type: 'realEstateTransaction',
    };

    try {
        const res = await client.create(transaction);
        console.log('here is the sanity response', res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// TODO: add email service and better error handling
export async function updateRealEstateTransaction(formData: RealEstateTransaction) {
    try {
        const res = await client.patch(formData._id).set(formData).commit();
        console.log('here is the sanity response', res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function deleteRealEstateTransaction(id: string) {
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
}

export async function getAllMortgageTransactions() {
    const query = `*[_type == "mortgageTransaction"]`;
    try {
        const transactions: MortgageTransaction[] = await client.fetch(query);
        return transactions;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

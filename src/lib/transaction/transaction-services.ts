'use server';
import { client } from '@/sanity/lib/client';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';
import { revalidateTag } from 'next/cache';

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

/**
 * @description Returns all real estate transactions by user_id
 * @params User ID from supabase
 * @returns Array of RealEstate TransactionObjects
 * */
export const getRealEstateTransactionsByUserId = async (userID: string) => {
    console.log('running on server...');
    // console.log('printing userID: ', userID);
    // const query = `*[_type == "realEstateTransaction" && agentInfo.agentID == $userID | order(_updatedAt desc)]`;
    try {
        // const transactions: RealEstateTransaction[] = await client.fetch(query, { userID });
        const transactions: RealEstateTransaction[] = await client.fetch(
            `*[_type == "realEstateTransaction" && agentInfo.agentID == "${userID}"] | order(_updatedAt desc)`,
            {},
            {
                next: {
                    revalidate: 1,
                    tags: ['realEstateTransactions'],
                },
            },
        );
        return transactions;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getRealEstateTransactionById = async (id: string) => {
    const query = `*[_type == "realEstateTransaction" && _id == $id]`;
    try {
        const transactions: RealEstateTransaction[] = await client.fetch(query, { id });
        return transactions[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

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
        revalidateTag('realEstateTransactions');
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
        revalidateTag('realEstateTransactions');
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
        // revalidateTag('realEstateTransactions');
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

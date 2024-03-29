import {
    deleteRealEstateTransaction,
    getAllRealEstateTransactions,
    getRealEstateTransactionsByUserId,
} from '@/lib/transaction/transaction-services';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';
import { getUserServer } from '@/services/supabase/auth-server-utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import TransactionsTable from '../shared-components/transactions-table';

// FIXME: transactions not refetching from form page and this one
// client probably isn't requesting data due to nextjs caching or some wonky behavior
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function RealEstateIndexPage() {
    cookies(); // opt into dynamic rendering

    const res = await getUserServer();
    console.log('printing res asap: ', res);
    let user;
    if ('user' in res && res.user !== null) {
        user = res.user;
    } else {
        console.log('printing res: ', res);
        user = null;
        return (
            <>
                <h1>Please be logged in!</h1>
            </>
        );
    }

    // const transactions = await getAllRealEstateTransactions();
    const transactions = await getRealEstateTransactionsByUserId(user.id);
    // console.log('printing transactions by user id... ', transactions);

    async function deleteTransactions(id: string): Promise<RealEstateTransaction[]> {
        'use server';
        console.log('deleting...');

        try {
            console.log('printing id arg: ', id);
            const res = await deleteRealEstateTransaction(id);
            const deletedId = res.documentIds[0];
            console.log('printing deletedId: ', deletedId);

            // const newTransactions = transactions.filter(
            //     (transaction) => transaction._id !== deletedId,
            // ) as RealEstateTransaction[];
            //
            // transactions = newTransactions;

            console.log('printing delete res: ', res);
            // TODO: return success and error types

            revalidatePath('/real-estate');

            const updatedTransactions = await getAllRealEstateTransactions();
            return updatedTransactions;
        } catch (err) {
            // FIXME: handle error
            console.log('Error from /real-estate page: ', err);
            return [];
        }
    }

    return (
        <div className='w-full'>
            <h1 className='flex justify-center'>Real Transactions</h1>
            <div className='mt-8'>
                <TransactionsTable
                    type='real-estate'
                    transactionsList={transactions}
                    deleteTransactions={deleteTransactions}
                />
            </div>
        </div>
    );
}

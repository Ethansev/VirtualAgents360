import {
    deleteRealEstateTransaction,
    getAllMortgageTransactions,
    getAllRealEstateTransactions,
} from '@/lib/transaction/transaction-services';
import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import TransactionsTable from '../shared-components/transactions-table';
// TODO: Add filters by user and LRU (last recently updated)
// TODO: Add a breadcrumb that goes on the top right

export default async function MortgageIndexPage() {
    const transactions = await getAllMortgageTransactions();

    async function deleteTransactions(id: string): Promise<MortgageTransaction[]> {
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
            // toast.success('Transaction has been deleted');

            const updatedTransactions = await getAllRealEstateTransactions();
            // return updatedTransactions;
            return [];
        } catch (err) {
            // FIXME: handle error
            console.log('Error from /real-estate page: ', err);
            return [];
        }
    }

    return (
        <div>
            <h1 className='flex justify-center'>All Mortgage Transactions</h1>
            <div className='mt-8'>
                <TransactionsTable
                    type='mortgage'
                    transactionsList={transactions}
                    deleteTransactions={deleteTransactions}
                />
            </div>
        </div>
    );
}

import { transactionService } from '@/app/api/transactions/transaction-services';
import { Suspense } from 'react';
import TransactionsTable from '../shared-components/transactions-table';

export default async function RealEstateIndexPage() {
    const transactions = await transactionService.getAllRealEstateTransactions();

    console.log('printing transactions', transactions);

    return (
        <Suspense fallback={<p>Loading real-estate/page.tsx</p>}>
            <div>
                <h1 className='flex justify-center'>Real Transactions</h1>
                <div className='mt-8'>
                    <TransactionsTable type='real-estate' transactions={transactions} />
                </div>
            </div>
        </Suspense>
    );
}

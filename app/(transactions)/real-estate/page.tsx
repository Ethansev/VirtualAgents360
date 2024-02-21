import { transactionService } from '@/app/api/transactions/transaction-services';
import TransactionsTable from '../shared-components/transactions-table';

export default async function RealEstateIndexPage() {
    const transactions = await transactionService.getAllRealEstateTransactions();

    return (
        // <Suspense fallback={<p>Loading real-estate/page.tsx</p>}>
        <div>
            <h1 className='flex justify-center'>Real Transactions</h1>
            <div className='mt-8'>
                <TransactionsTable type='real-estate' transactionsList={transactions} />
            </div>
        </div>
        // </Suspense>
    );
}

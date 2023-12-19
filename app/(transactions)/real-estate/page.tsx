import { transactionServices } from '@/app/api/transactions/transaction-services';
import TransactionsTable from '../components/transactions-table';

export default async function RealEstateIndexPage() {
  const transactions = await transactionServices.getAllRealEstateTransactions();

  return (
    <div>
      <h1 className='flex justify-center'>Real Transactions</h1>
      <div className='mt-8'>
        <TransactionsTable type='real-estate' transactions={transactions} />
      </div>
    </div>
  );
}

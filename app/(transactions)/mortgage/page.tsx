import { transactionsServices } from '@/app/api/transactions/transactions-services';
import TransactionsTable from '../components/transactions-table';
// TODO: Add filters by user and LRU (last recently updated)
// TODO: Add a breadcrumb that goes on the top right

export default async function MortgageIndexPage() {
  const transactions = await transactionsServices.getAllMortgageTransactions();
  return (
    <div>
      <h1 className='flex justify-center'>All Mortgage Transactions</h1>
      <h1>here is transactions title: {transactions[0].agent}</h1>
      <div className='mt-8'>
        <TransactionsTable type='mortgage' transactions={transactions} />
      </div>
    </div>
  );
}

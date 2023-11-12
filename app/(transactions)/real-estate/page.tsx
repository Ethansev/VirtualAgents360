import { transactionsServices } from '@/app/api/transactions/transactions-services';
import Link from 'next/link';
import RealEstateTransactionsTable from './components/real-estate-table';

export default async function RealEstateIndexPage() {
  const transactions = await transactionsServices.getAllRealEstateTransactions();

  return (
    <div>
      <p>hello world</p>
      <Link href='/real-estate/transaction'>
        <button>add new transaction</button>
      </Link>
      <RealEstateTransactionsTable transactions={transactions} />
    </div>
  );
}

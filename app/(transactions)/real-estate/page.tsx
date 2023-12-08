import { transactionsServices } from '@/app/api/transactions/transactions-services';
import TransactionsTable from '../components/transactions-table';

export default async function RealEstateIndexPage() {
  const transactions = await transactionsServices.getAllRealEstateTransactions();

  return (
    <div>
      <TransactionsTable type='real-estate' transactions={transactions} />
    </div>
  );
}

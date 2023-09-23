import Table from './components/Table';
import { transactionsServices } from '../api/transactions/transactions-services';
import TransactionComponent from '../TransactionComponent';

export default async function TransactionsPage() {
  const transactions = await transactionsServices.getTransactions();

  return (
    <div>
      <h1>Transactions page</h1>
      {/* <Table /> */}
      <ul>
        {transactions!.map((transaction) => (
          <TransactionComponent key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

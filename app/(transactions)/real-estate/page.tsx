'use client';
import { transactionsServices } from '@/app/api/transactions/transactions-services';
import { RealEstateTransactionSchema } from '@/sanity/schemas/real-estate-transactions';
import { useEffect, useState } from 'react';
import { realEstateTransactionStageViewMap } from './services';
import Link from 'next/link';

export default function RealEstateIndexPage() {
  const [transactions, setTransactions] = useState([] as RealEstateTransactionSchema[]);
  useEffect(() => {
    getRealEstateTransactions();
  }, []);

  async function getRealEstateTransactions() {
    const res = await transactionsServices.getAllRealEstateTransactions();
    console.log(res);
    setTransactions(res);
  }
  return (
    <div>
      <p>hello world</p>
      <Link href='/real-estate/transaction'>
        <button>add new transaction</button>
      </Link>
      {transactions.map((transaction) => (
        <div className='mt-8' key={transaction._id}>
          {transaction.title}
          {transaction.status === 'pending' && <div>Pending</div>}
          <div>
            Here is transaction stage:{' '}
            {realEstateTransactionStageViewMap[transaction.transactionStage]}
          </div>
        </div>
      ))}
    </div>
  );
}

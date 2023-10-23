'use client';
import { transactionsServices } from '@/app/api/transactions/transactions-services';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { realEstateTransactionsStageDisplayMap } from './utils';

export default function RealEstateIndexPage() {
  const [transactions, setTransactions] = useState([] as RealEstateTransaction[]);
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
          {transaction.agent}
          {transaction.status === 'pending' && <div>Pending</div>}
          <div>
            Here is transaction stage:{' '}
            {realEstateTransactionsStageDisplayMap[transaction.transactionStage]}
          </div>
        </div>
      ))}
    </div>
  );
}

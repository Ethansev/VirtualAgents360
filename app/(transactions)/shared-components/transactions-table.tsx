import { MortgageTransaction } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransaction } from '@/sanity/schemas/real-estate-transaction.types';
import Link from 'next/link';

type Props = {
  transactions: RealEstateTransaction[] | MortgageTransaction[];
  type: 'real-estate' | 'mortgage';
};

export default function TransactionsTable(props: Props) {
  const { transactions, type } = props;
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>Transactions</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all transactions and the property information associated with each of them.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link href={`/${type}/transaction`}>
            <button
              type='button'
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Add a New Property
            </button>
          </Link>
        </div>
      </div>

      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Subject Property
                  </th>

                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3'>
                    Date
                  </th>

                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Agent Name
                  </th>

                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Stage
                  </th>

                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    Status
                  </th>

                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className='bg-white'>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className='even:bg-gray-50'>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {transaction.subjectProperty}
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3'>
                      {transaction._createdAt}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {transaction.agent}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {transaction.stage}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {transaction.status}
                    </td>
                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                      <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                        Edit<span className='sr-only'>, {'edit wtf is this'}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

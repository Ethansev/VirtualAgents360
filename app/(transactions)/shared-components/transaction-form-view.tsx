'use client';

import { MortgageTransactionStage } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
import { useSearchParams } from 'next/navigation';

type Props = {
  type: 'real-estate' | 'mortgage';
  children: React.ReactNode;
};

// used for both real estate and mortgage transactions
export default function TransactionFormView({ type, children }: Props) {
  // const pathname = usePathname();
  // console.log('printing pathname', pathname);

  const searchParams = useSearchParams();
  const stage = searchParams.get('stage') as
    | RealEstateTransactionStage
    | MortgageTransactionStage
    | null;

  function renderImportantInfo() {
    if (type === 'real-estate') {
      switch (stage) {
        case 'addPropertyInformation':
          return <div>Add Property Information</div>;
        case 'transactionRegistration':
          return <div>New Transaction Registration</div>;
        case 'addChange':
          return <div>New Transaction Registration</div>;
        case 'edmDocumentUpload':
          return <div>EDM Document Upload</div>;
        case 'instructionToPayCommission':
          return <div>Instruction to Pay Commission</div>;
        case 'commissionDisbursement':
          return <div>Commission Disbursement</div>;
        default:
          return <div>Add Property Information</div>;
      }
    } else if (type === 'mortgage') {
      return <div>Mortgage</div>;
    }
  }

  return (
    <div className='mt-16 '>
      <div className='grid grid-cols-12 gap-x-8'>
        <div className='col-span-3'>
          <div className=' flex flex-row pl-8  '>
            <p>Side Form Nav</p>
          </div>
        </div>

        <div className='col-span-6'>{children}</div>

        <div className='col-span-3'>
          <div className='pl-8'>
            <h1>
              <p>Important Info & Procedures</p>
            </h1>
            <div>{renderImportantInfo()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

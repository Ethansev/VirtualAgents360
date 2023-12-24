'use client';

import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
// import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import NewPropertyInformationForm from '../../../components/real-estate-forms/new-property-information';

// export const dynanicParams = false;
// export function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   const paths = realEstateTransactionStageList.map((object) => object.value);
//   return paths;
// }

export default function Page() {
  // const res = await transactionService.getRealEstateTransactionById(id);
  // console.log('printing result of getRealEstateTransactionById', res);

  const searchParams = useSearchParams();
  const stage = searchParams.get('stage') as RealEstateTransactionStage | null;

  function renderForm() {
    switch (stage) {
      case 'addPropertyInformation':
        return NewPropertyInformationForm();
      case 'transactionRegistration':
        return <div>transactionRegistration</div>;
      case 'addChange':
        return <div>addChange</div>;
      case 'edmDocumentUpload':
        return <div>edmDocumentUpload</div>;
      case 'instructionToPayCommission':
        return <div>instructionToPayCommission</div>;
      case 'commissionDisbursement':
        return <div>commissionDisbursement</div>;
      default:
        return NewPropertyInformationForm();
    }
  }

  return (
    <>
      <p>this is the transaction/[id] page</p>
      {renderForm()}
    </>
  );
}

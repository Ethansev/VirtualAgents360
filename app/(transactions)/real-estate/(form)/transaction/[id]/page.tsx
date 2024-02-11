'use client';

import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
// import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import AddChangeForm from '../../../components/real-estate-forms/add-change';
import CommissionDisbursementForm from '../../../components/real-estate-forms/commission-disbursement';
import EDMDocumentUploadForm from '../../../components/real-estate-forms/edm-document-upload';
import InstructionToPayCommissionForm from '../../../components/real-estate-forms/instruction-to-pay-commission';
import NewPropertyInformationForm from '../../../components/real-estate-forms/new-property-information';
import TransactionRegistrationForm from '../../../components/real-estate-forms/transaction-registration';

// export const dynanicParams = false;
// export function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   const paths = realEstateTransactionStageList.map((object) => object.value);
//   return paths;
// }

// TODO: use the id to fetch data from sanity
// I think I should pass the entire transaction object to the form <-- yes this.
// each form checks if it's passed an object and uses that to determine post/patch requests
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
                return TransactionRegistrationForm();
            case 'addChange':
                return AddChangeForm();
            case 'edmDocumentUpload':
                return EDMDocumentUploadForm();
            case 'instructionToPayCommission':
                return InstructionToPayCommissionForm();
            case 'commissionDisbursement':
                return CommissionDisbursementForm();
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

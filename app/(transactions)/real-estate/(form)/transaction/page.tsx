'use client';

import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
import { useSearchParams } from 'next/navigation';
import NewPropertyInformationForm from '../../components/real-estate-forms/new-property-information';
import TransactionRegistrationForm from '../../components/real-estate-forms/transaction-registration';

export default function RealEstateTransactionPage() {
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage') as RealEstateTransactionStage | null;

    function renderForm() {
        console.log('hello printing stage from page.tsx', stage);
        // TODO: transaction types?
        switch (stage) {
            case 'addPropertyInformation':
                return <NewPropertyInformationForm />;
            case 'transactionRegistration':
                return <TransactionRegistrationForm />;
            // case 'addChange':
            // return <div>New Transaction Registration</div>;
            // case 'edmDocumentUpload':
            // return <div>EDM Document Upload</div>;
            // case 'instructionToPayCommission':
            // return <div>Instruction to Pay Commission</div>;
            // case 'commissionDisbursement':
            // return <div>Commission Disbursement</div>;
            default:
                return <NewPropertyInformationForm />;
        }
    }

    return <>{renderForm()}</>;
}

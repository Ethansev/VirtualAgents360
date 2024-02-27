'use client';

import {
    RealEstateTransaction,
    RealEstateTransactionStage,
} from '@/sanity/schemas/real-estate-transaction.types';
import { useSearchParams } from 'next/navigation';
import NewPropertyInformationForm from './real-estate-forms/new-property-information';
import TransactionRegistrationForm from './real-estate-forms/transaction-registration';

type Props = {
    // stage?: RealEstateTransactionStage | null;
    transactionData?: RealEstateTransaction | null;
};

export default function FormContainer(props: Props) {
    const { transactionData } = props;
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage') as RealEstateTransactionStage | null;

    // console.group('FormContainer');
    // console.log('stage', stage);
    // console.log('transactionData', transactionData);
    // console.groupEnd();

    // TODO: complete this after the forms are done
    function renderForm() {
        if (transactionData) {
            switch (stage) {
                case 'addPropertyInformation':
                    return (
                        <NewPropertyInformationForm
                            stage={stage}
                            transactionData={transactionData}
                        />
                    );
                case 'transactionRegistration':
                    return <TransactionRegistrationForm transactionData={transactionData} />;
                // case 'addChange':
                // return <div>New Transaction Registration</div>;
                // case 'edmDocumentUpload':
                // return <div>EDM Document Upload</div>;
                // case 'instructionToPayCommission':
                // return <div>Instruction to Pay Commission</div>;
                // case 'commissionDisbursement':
                // return <div>Commission Disbursement</div>;
                default:
                    return (
                        <NewPropertyInformationForm
                            stage={stage}
                            transactionData={transactionData}
                        />
                    );
            }
        } else {
            return <NewPropertyInformationForm stage={stage} />;
        }
    }

    return (
        <>
            {/* <Suspense fallback={<p>Loading form...</p>}>{renderForm()}</Suspense> */}
            {renderForm()}
        </>
    );
}

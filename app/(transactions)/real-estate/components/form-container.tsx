import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
import { Suspense } from 'react';
import NewPropertyInformationForm from './real-estate-forms/new-property-information';
import TransactionRegistrationForm from './real-estate-forms/transaction-registration';

type Props = {
    stage?: RealEstateTransactionStage | null;
    newForm: boolean;
};

export default function FormContainer(props: Props) {
    const { stage, newForm } = props;

    // TODO: Not sure if useSearchParams is useful in this context
    // const searchParams = useSearchParams();

    console.group('FormContainer');
    console.log('stage', stage);
    console.log('newForm', newForm);
    console.groupEnd();

    // TODO: complete this after the forms are done
    function renderForm() {
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

    return (
        <>
            <Suspense fallback={<p>Loading form...</p>}>{renderForm()}</Suspense>
        </>
    );
}

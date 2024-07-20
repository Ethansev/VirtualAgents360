'use client';

import { MortgageTransactionStage } from '@/sanity/schemas/mortgage-transaction.types';
import { RealEstateTransactionStage } from '@/sanity/schemas/real-estate-transaction.types';
import { useSearchParams } from 'next/navigation';
import VerticalNavigation from './vertical-navigation';

type Props = {
    type: 'real-estate' | 'mortgage';
    transactionID?: string;
    children: React.ReactNode;
};

// used for both real estate and mortgage transactions
export default function TransactionFormLayout({ type, transactionID, children }: Props) {
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

    function renderSideFormNav() {
        if (type === 'real-estate') {
            if (!transactionID) {
                // TODO: return disabled side nav
                return null;
            }
            return <VerticalNavigation navigation={realEstateNavigation} />;
        }
    }

    const realEstateNavigation = [
        {
            name: 'Property Information',
            href: `/real-estate/transaction/${transactionID}/?stage=addPropertyInformation`,
            current: stage === 'addPropertyInformation',
        },
        {
            name: 'Transaction Registration',
            href: `/real-estate/transaction/${transactionID}/?stage=transactionRegistration`,
            current: stage === 'transactionRegistration',
        },
        {
            name: 'Add/Change',
            href: `/real-estate/transaction/${transactionID}/?stage=addChange`,
            current: stage === 'addChange',
        },
        {
            name: 'Instruction to Pay Commission',
            href: `/real-estate/transaction/${transactionID}/?stage=instructionToPayCommission`,
            current: stage === 'instructionToPayCommission',
        },
        {
            name: 'Commission Disbursement',
            href: `/real-estate/transaction/${transactionID}/?stage=commissionDisbursement`,
            current: stage === 'commissionDisbursement',
        },
    ];

    return (
        // <Suspense fallback={<p>Loading from transaction-form-view.tsx</p>}>
        <div className='mt-16 '>
            <div className='grid grid-cols-12 gap-x-8'>
                <div className='col-span-3'>
                    <div className=' flex flex-col pl-8  '>
                        <div className=''>{renderSideFormNav()}</div>
                    </div>
                </div>

                <div className='col-span-6'>{children}</div>

                <div className='col-span-3'>
                    <div className='pl-8'>
                        <h1>Important Info & Procedures</h1>
                        <div>{renderImportantInfo()}</div>
                    </div>
                </div>
            </div>
        </div>
        // </Suspense>
    );
}

import TransactionFormLayout from '@/app/(transactions)/shared-components/transaction-form-layout';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Real Estate Transaction',
    description: '',
};

export default function RealEstateTransactionIDLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        id: string;
    };
}) {
    const { id } = params;
    return (
        <section>
            {/* TODO: Add skeleton loading for the form */}
            <Suspense fallback={<p>Loading form...</p>}>
                <TransactionFormLayout type='real-estate' transactionID={id}>
                    {children}
                </TransactionFormLayout>
            </Suspense>
        </section>
    );
}

// import NavBar from '../../global-components/nav-bar';
import TransactionFormLayout from '@/app/(transactions)/shared-components/transaction-form-layout';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Home Page',
    description: 'Generated by create next app',
};

export default function RealEstateTemplate({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {/* TODO: Add skeleton loading for the form */}
            <Suspense fallback={<p>Loading form...</p>}>
                <TransactionFormLayout type='real-estate'>{children}</TransactionFormLayout>
            </Suspense>
        </section>
    );
}

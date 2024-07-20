// import NavBar from '../../global-components/nav-bar';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Real Estate Transaction',
    description: '',
};

export default function RealEstateTemplate({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {/* TODO: Add skeleton loading for the form */}
            <Suspense fallback={<p>Loading form...</p>}>
                {children}
                {/* <TransactionFormLayout type='real-estate'>{children}</TransactionFormLayout> */}
            </Suspense>
        </section>
    );
}

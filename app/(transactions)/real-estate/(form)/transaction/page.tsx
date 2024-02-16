'use client';

import { Suspense } from 'react';
import FormContainer from '../../components/form-container';

export default function RealEstateTransactionPage() {
    // const searchParams = useSearchParams();
    // const stage = searchParams.get('stage') as RealEstateTransactionStage | null;

    return (
        <Suspense fallback={<p>Loading from real-estate transaction page</p>}>
            <FormContainer />
        </Suspense>
    );
}

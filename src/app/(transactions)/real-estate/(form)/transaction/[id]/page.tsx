// import { useRouter } from 'next/navigation';
import { getRealEstateTransactionById } from '@/lib/transaction/transaction-services';
import { Suspense } from 'react';
import FormContainer from '../../../components/form-container';

// export const dynanicParams = false;
// export function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   const paths = realEstateTransactionStageList.map((object) => object.value);
//   return paths;
// }

export default async function Page({ params }: { params: { id: string } }) {
    const transactionData = await getRealEstateTransactionById(params.id);

    return (
        <Suspense fallback={<p>Loading from real-estate transaction page</p>}>
            <FormContainer transactionData={transactionData} />
        </Suspense>
    );
}

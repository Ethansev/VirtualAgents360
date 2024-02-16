'use client';

// import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import FormContainer from '../../../components/form-container';

// export const dynanicParams = false;
// export function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   const paths = realEstateTransactionStageList.map((object) => object.value);
//   return paths;
// }

// TODO: use the id to fetch data from sanity
// I think I should pass the entire transaction object to the form <-- yes this.
// each form checks if it's passed an object and uses that to determine post/patch requests
export default function Page({ params }: { params: { id: string } }) {
    // const searchParams = useSearchParams();
    // const id = searchParams.get('id');

    return (
        <Suspense fallback={<p>Loading from real-estate transaction page</p>}>
            <FormContainer id={params.id} />;
        </Suspense>
    );
}

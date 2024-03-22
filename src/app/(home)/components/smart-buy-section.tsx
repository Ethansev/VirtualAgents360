'use client';

import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
    {
        name: 'Smart-Buy Combo',
        description: '$495 Company Dollars is reduced to only $195',
        url: '',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Smart-Buy Mentor',
        description: '100% of nothing, or 50% of something',
        url: '',
        icon: LockClosedIcon,
    },
    {
        name: 'Smart-Buy Pre-Qual',
        description: 'Steps to streamline the home purchase process',
        url: '',
        icon: ArrowPathIcon,
    },
    {
        name: 'Smart-Buy Referral',
        description: 'Epic 50% referral fee on closed transactions',
        url: '',
        icon: FingerPrintIcon,
    },
];

export default function SmartBuySection() {
    // const router = useRouter();
    // function handleOnClick(url: string) {
    //     router.push(url);
    // }

    return (
        <div className='bg-white py-8 sm:py-16'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:text-center'>
                    {/* <h2 className='text-base font-semibold leading-7 text-indigo-600'> */}
                    {/* Testing */}
                    {/* </h2> */}
                    <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Our Smart-Buy Solutions
                    </p>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                        Experience the future of real estate excellence with us!
                    </p>
                </div>
                <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
                    <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
                        {features.map((feature) => (
                            <div key={feature.name} className='relative pl-16'>
                                <dt className='text-base font-semibold leading-7 text-gray-900'>
                                    <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                                        <feature.icon
                                            className='h-6 w-6 text-white'
                                            aria-hidden='true'
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className='mt-2 text-base leading-7 text-gray-600'>
                                    {feature.description}
                                </dd>
                                <Link
                                    href='#'
                                    className='text-sm font-semibold leading-6 text-gray-900'>
                                    Learn more <span aria-hidden='true'>→</span>
                                </Link>
                                {/* <Link href={feature.url}>Learn More</Link> */}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

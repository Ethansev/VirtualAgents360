import {
    BuildingOffice2Icon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    TableCellsIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';

const features = [
    {
        name: 'MLS Access',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: TableCellsIcon,
    },
    {
        name: 'zipForm',
        description:
            'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: DocumentTextIcon,
    },
    {
        name: 'National Association of Realtors',
        description:
            'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: BuildingOfficeIcon,
    },
    {
        name: 'California DRE',
        description:
            'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: BuildingOffice2Icon,
    },
];

export default function MortgageSection() {
    return (
        <div className='overflow-hidden bg-white py-8 sm:py-16'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
                    <div className='lg:mr-auto lg:pr-4 lg:pt-4'>
                        <div className='lg:max-w-lg'>
                            {/* <h2 className='text-base font-semibold leading-7 text-indigo-600'> */}
                            {/*     Testing  */}
                            {/* </h2> */}
                            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                Our Mortgage Tools
                            </p>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                                impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                                ratione.
                            </p>
                            <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                                {features.map((feature) => (
                                    <div key={feature.name} className='relative pl-9'>
                                        <dt className='inline font-semibold text-gray-900'>
                                            <feature.icon
                                                className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className='inline'>{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className='flex items-start justify-start'>
                        <Image
                            src='/mortgage.jpg'
                            alt='Mortgage image'
                            className='w-[48rem] max-w-none rounded-xl rounded-tl-[150px] shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] 2xl:rounded-tl-xl'
                            // className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]'
                            // width={2132}
                            // height={1500}
                            width={1500}
                            height={1100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

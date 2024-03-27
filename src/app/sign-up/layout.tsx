import Image from 'next/image';
export default async function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={'flex h-full min-h-screen w-full flex-1 flex-row'}>
            <div className='flex w-full flex-col items-center justify-center border-r'>
                {children}
            </div>
            <div className='hidden w-full flex-col items-center justify-center bg-blue-50 text-center lg:flex'>
                <Image
                    className='mb-16'
                    src='/login2.svg'
                    alt='Login Image'
                    width='400'
                    height='1000'
                />
            </div>
        </div>
    );
}

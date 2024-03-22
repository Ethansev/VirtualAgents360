import '@/app/globals.css';
import NavBar from '@/components/nav-bar';
import { Suspense } from 'react';
// import { getServerSession } from 'next-auth';
// import SessionProvider from './components/SessionProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // const session = await getServerSession();

    return (
        <html lang='en'>
            {/* <SessionProvider session={session}> */}
            <body>
                {/* this suspense isn't really doing anything... still testing */}
                <Suspense fallback={'loading navbar...'}>
                    <NavBar />
                </Suspense>
                <div
                    className={
                        'flex min-h-screen flex-col items-center justify-between px-12 pt-12'
                    }>
                    {children}
                </div>
            </body>
            {/* </SessionProvider> */}
        </html>
    );
}

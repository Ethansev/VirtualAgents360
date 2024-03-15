import NavBar from '@/app/components/nav-bar';
import '@/app/globals.css';
// import { getServerSession } from 'next-auth';
// import SessionProvider from './components/SessionProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // const session = await getServerSession();

    return (
        <html lang='en'>
            {/* <SessionProvider session={session}> */}
            <body>
                <NavBar />
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

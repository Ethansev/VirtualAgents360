import '@/app/globals.css';
import NavBar from '@/components/nav-bar';
// import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function TransactionsModuleLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className={'flex min-h-screen w-full flex-col items-center justify-between'}>
                {children}
            </div>
        </>
    );
}

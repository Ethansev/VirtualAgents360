import '@/app/globals.css';
// import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function TransactionsModuleLayout({ children }: { children: React.ReactNode }) {
    return <div className='w-full'>{children}</div>;
}

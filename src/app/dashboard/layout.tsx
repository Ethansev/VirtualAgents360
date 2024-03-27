import '@/app/globals.css';
import NavBar from '@/components/nav-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // TODO: finish this dashboard and do stuff here
    // transactions table + communications + links + agent commissions
    return (
        <>
            <NavBar />
            <div
                className={
                    'flex min-h-screen w-full flex-col items-center justify-between px-12 pt-12'
                }>
                {children}
            </div>
        </>
    );
}

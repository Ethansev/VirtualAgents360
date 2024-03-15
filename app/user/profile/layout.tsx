import NavBar from '@/app/components/nav-bar';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavBar />
            <div className={'flex min-h-screen flex-col items-center justify-between px-12 pt-12'}>
                {children}
            </div>
        </section>
    );
}

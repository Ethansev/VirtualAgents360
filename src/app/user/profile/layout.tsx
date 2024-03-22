import '@/app/globals.css';
import NavBar from '@/components/nav-bar';

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

import '@/app/globals.css';
import NavBar from '@/components/nav-bar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <NavBar />
                <div className={'flex min-h-screen flex-col items-center justify-between'}>
                    {children}
                </div>
            </body>
        </html>
    );
}

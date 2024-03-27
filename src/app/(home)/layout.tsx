import NavBar from '@/components/nav-bar';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className={'flex min-h-screen w-full flex-col items-center justify-between'}>
                {children}
            </div>
        </>
    );
}

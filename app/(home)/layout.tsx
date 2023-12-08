import NavBar from '@/app/global-components/nav-bar';
import '@/app/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function TransactionsModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <UserProvider>
        {/* <UserProvider /> is useContext for Auth0 */}
        <body>
          <NavBar />
          <div className={'flex min-h-screen flex-col items-center justify-between pt-12'}>
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}

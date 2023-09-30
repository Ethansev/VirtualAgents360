import './globals.css';
import NavBar from './global-components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <UserProvider>
        {/* <UserProvider /> is useContext for Auth0 */}
        <body>
          <NavBar />
          <div className={'flex min-h-screen flex-col items-center justify-between px-24 pt-12'}>
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}

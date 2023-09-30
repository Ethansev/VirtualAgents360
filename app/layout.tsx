import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './global-components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <UserProvider>
        {/* <UserProvider /> is useContext for Auth0 */}
      <body>
        <NavBar />
        {/* <div
          className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24'`}>
          {children}
        </div> */}
        {children}
      </body>
      </UserProvider>
    </html>
  );
}

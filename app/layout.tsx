import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './global-components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        {/* <div
          className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24'`}>
          {children}
        </div> */}
        {children}
      </body>
    </html>
  );
}

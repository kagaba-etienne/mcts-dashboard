import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '../components/nav/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from '../components/Layouts/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCTS',
  description: 'Elevate Your Math Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg relative`}>
        <ClientLayout>
          <ToastContainer />
          <Nav />
          <div className=" md:ml-[200px] px-10 transform transition-all duration-300">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}

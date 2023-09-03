import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';
export const metadata = {
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
      <body className="bg-bg">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}

import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '@/Components/Layout';
import RouteLoading from '@/Components/UI/Loading/RouteLoading';

export const metadata: Metadata = {
  title: 'Almutasaweq Catalog',
  description: 'مرحبًا بك في كتالوج المتسوق',
  openGraph: {
    title: 'Al Mutasaweq Catalog',
    type: 'website',
  },
  icons: {
    icon: '/app-icon.png',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ar">
      <body>
        <Container>

          <RouteLoading>
            {children}
          </RouteLoading>

        </Container>
        <ToastContainer position="bottom-center" rtl />
      </body>
    </html>
  );
}
export default RootLayout
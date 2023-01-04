import '../styles/globals.css';
import { Poppins } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Aside, BottomNav, Header } from '~/components';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

dayjs.locale('id');

const queryClient = new QueryClient();

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <title>Beranda Muslim</title>
      <meta name="description" content="Beranda Muslim adalah website yang berisi kumpulan artikel-artikel Islam yang telah dikumpulkan dari website-website Ahlusunnah bermanhaj salaf." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <style jsx global>
      {`
        html {
          font-family: ${poppins.style.fontFamily};
        }
    `}
    </style>
    <div>
      <Header />
      <Aside />
      <div className="pt-14 pb-20 lg:pb-0 lg:pl-60">
        <main className="px-4 lg:px-8 xl:px-16 pt-8 lg:pt-10 pb-4">
          <Component {...pageProps} />
        </main>
      </div>
      <BottomNav />
    </div>
  </QueryClientProvider>
);

export default App;

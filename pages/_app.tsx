import '../styles/globals.css';
import { Poppins } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { setDefaultOptions } from 'date-fns';
import { id } from 'date-fns/locale';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { Aside, BottomNav, Header } from '~/components';

setDefaultOptions({ locale: id });

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const queryClient = new QueryClient();

const title = 'Beranda Muslim';
const description = 'Beranda Muslim adalah website yang berisi kumpulan artikel-artikel dan video kajian Islam yang telah dikumpulkan dari website-website dan channel Youtube Ahlusunnah bermanhaj salaf.';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2b62b6" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
      <meta name="theme-color" content="#2b62b6" />

      <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />

      <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2b62b6" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://berandamuslim.id" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://berandamuslim.id/icons/android-chrome-192x192.png" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content="https://berandamuslim.id" />
      <meta property="og:image" content="https://berandamuslim.id/icons/apple-touch-icon.png" />
    </Head>
    <style jsx global>
      {`
        html {
          font-family: ${poppins.style.fontFamily};
        }
    `}
    </style>
    <NextNProgress color="#2b62b6" />
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
    <Analytics />
  </QueryClientProvider>
);

export default App;

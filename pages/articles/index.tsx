import { NextPage } from 'next';
import Head from 'next/head';
import { ScrollToTop, ArticleSection } from '~/components';

const Articles: NextPage = () => (
  <div>
    <Head>
      <title>Artikel Islam - Beranda Muslim</title>
    </Head>
    <ArticleSection />
    <ScrollToTop />
  </div>
);

export default Articles;

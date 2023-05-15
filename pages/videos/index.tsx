import { NextPage } from 'next';
import Head from 'next/head';
import { ScrollToTop, VideoSection } from '~/components';

const Videos: NextPage = () => (
  <div>
    <Head>
      <title>Video Kajian Islam - Beranda Muslim</title>
    </Head>
    <VideoSection />
    <ScrollToTop />
  </div>
);

export default Videos;

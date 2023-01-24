import camelcaseKeys from 'camelcase-keys';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { ScrollToTop, VideoSection } from '~/components';
import { api } from '~/helpers';
import { ResponseAPI, Video } from '~/interfaces';

interface Data {
  data: ResponseAPI<Video[]>;
}

export const getServerSideProps: GetServerSideProps<Data> = async ({ req }) => {
  let search = '';
  let channelIds = '';
  if (req.url) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    search = searchParams.get('search') || '';
    channelIds = searchParams.get('channelIds') || '';
  }
  const data = await api.videos({
    page: 1, perPage: 18, search, channelIds: channelIds.split(','),
  });

  return {
    props: {
      data: camelcaseKeys(data, { deep: true }),
    },
  };
};

const Videos: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => (
  <div>
    <Head>
      <title>Video Kajian Islam - Beranda Muslim</title>
    </Head>
    <VideoSection initialData={data} />
    <ScrollToTop />
  </div>
);

export default Videos;

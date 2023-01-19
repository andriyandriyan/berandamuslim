import camelcaseKeys from 'camelcase-keys';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import {
  ArticleSection, ScrollToTop, Tab, Tabs, VideoSection,
} from '~/components';
import { api } from '~/helpers';
import { Article, ResponseAPI, Video } from '~/interfaces';

interface Data {
  articles: ResponseAPI<Article[]>;
  videos: ResponseAPI<Video[]>;
}

export const getServerSideProps: GetServerSideProps<Data> = async ({ req }) => {
  let search = '';
  let category = '';
  let channelIds = '';
  if (req.url) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    search = searchParams.get('search') || '';
    category = searchParams.get('category') || '';
    channelIds = searchParams.get('channelIds') || '';
  }
  const [articles, videos] = await Promise.all([
    api.articles({
      page: 1, perPage: 18, search, category: category ? category.split('_')[0] : '',
    }),
    api.videos({
      page: 1, perPage: 18, search, channelIds: channelIds.split(','),
    }),
  ]);

  return {
    props: {
      articles: camelcaseKeys(articles, { deep: true }),
      videos: camelcaseKeys(videos, { deep: true }),
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  articles, videos,
}) => {
  const tabs: Tab[] = [
    {
      value: 'articles',
      label: 'Artikel',
      content: <ArticleSection initialData={articles} />,
    },
    {
      value: 'videos',
      label: 'Video',
      content: <VideoSection initialData={videos} />,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
      <ScrollToTop />
    </div>
  );
};

export default Home;

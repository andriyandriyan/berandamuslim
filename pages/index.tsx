import { NextPage } from 'next';
import {
  ArticleSection, ScrollToTop, Tab, Tabs, VideoSection,
} from '~/components';

const Home: NextPage = () => {
  const tabs: Tab[] = [
    {
      value: 'articles',
      label: 'Artikel',
      content: <ArticleSection />,
    },
    {
      value: 'videos',
      label: 'Video',
      content: <VideoSection />,
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

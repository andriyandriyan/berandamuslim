import { IconBookmarksOff } from '@tabler/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import {
  ArticleCard, ModalVideo, ScrollToTop, Tab, Tabs, VideoCard,
} from '~/components';
import { utils } from '~/helpers';
import { Article, Video } from '~/interfaces';

const Bookmarks: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [prevUrl, setPrevUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video>();

  useEffect(() => {
    setArticles(utils.getArticleBookmarks());
    setVideos(utils.getVideoBookmarks());
  }, []);

  const onArticleBookmark = useCallback(() => {
    setArticles(utils.getArticleBookmarks());
  }, []);

  const onVideoBookmark = useCallback(() => {
    setVideos(utils.getVideoBookmarks());
  }, []);

  const onClick = (video: Video) => () => {
    setShowModal(true);
    setSelectedVideo(video);
    setPrevUrl(window.location.href);
    window.history.pushState(null, video.title, `/videos/${video.id}`);
  };

  const onHideModal = () => {
    setShowModal(false);
    window.history.replaceState(null, '', prevUrl);
  };

  const tabs: Tab[] = [
    {
      value: 'articles',
      label: 'Artikel',
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} onBookmark={onArticleBookmark} />
            ))}
          </div>
          {!articles.length && (
            <div className="flex flex-col items-center justify-center pt-32">
              <IconBookmarksOff className="text-gray-500 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900">Bookmark kosong</h3>
            </div>
          )}
        </div>
      ),
    },
    {
      value: 'videos',
      label: 'Video',
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onBookmark={onVideoBookmark}
                onClick={onClick(video)}
              />
            ))}
          </div>
          {!videos.length && (
            <div className="flex flex-col items-center justify-center pt-32">
              <IconBookmarksOff className="text-gray-500 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900">Bookmark kosong</h3>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Bookmark - Beranda Muslim</title>
      </Head>
      <div>
        <Tabs tabs={tabs} />
        <ScrollToTop />
      </div>
      {selectedVideo && (
        <ModalVideo
          show={showModal}
          onHide={onHideModal}
          video={selectedVideo}
        />
      )}
    </>
  );
};

export default Bookmarks;

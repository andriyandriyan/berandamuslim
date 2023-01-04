import { IconBookmarksOff } from '@tabler/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { ArticleCard } from '~/components';
import { utils } from '~/helpers';
import { Article } from '~/interfaces';

const Bookmarks: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(utils.getBookmarks());
  }, []);

  const onBookmark = useCallback(() => {
    setArticles(utils.getBookmarks());
  }, []);

  return (
    <>
      <Head>
        <title>Bookmark - Beranda Muslim</title>
      </Head>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} onBookmark={onBookmark} />
          ))}
        </div>
        {!articles.length && (
          <div className="flex flex-col items-center justify-center pt-32">
            <IconBookmarksOff className="text-gray-500 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900">Bookmark kosong</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;

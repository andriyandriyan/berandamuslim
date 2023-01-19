/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import { IconBookmark } from '@tabler/icons';
import { format, isToday, isYesterday } from 'date-fns';
import Link from 'next/link';
import {
  FC, LegacyRef, memo, useMemo, useState,
} from 'react';
import { utils } from '~/helpers';
import { Article } from '~/interfaces';

interface ArticeCardProps {
  article: Article;
  innerRef?: LegacyRef<HTMLDivElement>;
  onBookmark?(): void;
}

const ArticeCard: FC<ArticeCardProps> = ({ article, innerRef, onBookmark }) => {
  const bookmarks: Article[] = typeof localStorage !== 'undefined' ? utils.getArticleBookmarks() : [];
  const [
    isBookmark, setIsBookmark,
  ] = useState(bookmarks.some(bookmark => bookmark.id === article.id));

  const onClick = () => {
    window.open(article.sourceUrl, '_blank');
  };

  const published = (date: string) => {
    const formattedDate = new Date(date);
    if (isToday(formattedDate)) {
      return 'Hari ini';
    }
    if (isYesterday(formattedDate)) {
      return 'Kemarin';
    }
    return format(formattedDate, 'dd LLL yyyy');
  };

  const toggleBookmark = () => {
    utils.toggleBookmark(article);
    setIsBookmark(prevState => !prevState);
    onBookmark?.();
  };

  const categoryLink = useMemo(() => {
    if (typeof document === 'undefined') {
      return '';
    }
    const urlSearchParams = new URLSearchParams(document.location.search);
    const { slug, name } = article.articleCategory;
    urlSearchParams.set('category', `${slug}_${name}`);
    return `?${urlSearchParams.toString()}`;
  }, [article]);

  return (
    <div
      className="flex flex-col rounded-lg shadow-lg ring-1 ring-zinc-900/5 overflow-hidden"
      ref={innerRef}
    >
      <div className="flex flex-col flex-1 relative">
        <div
          role="button"
          onClick={onClick}
          tabIndex={0}
          aria-hidden="true"
        >
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="object-cover w-full h-44"
            />
          ) : (
            <div className="w-full h-44 p-4 bg-primary-500 flex items-center justify-center relative">
              <div className="absolute left-2 top-4 text-9xl font-semibold text-black/10 z-[1]">
                {article.title[0]}
              </div>
              <p className="text-white font-semibold text-lg line-clamp-4 ml-2 z-[2]" dangerouslySetInnerHTML={{ __html: article.title }} />
            </div>
          )}
          <div className="p-4 pb-2">
            <h3 className="font-semibold" dangerouslySetInnerHTML={{ __html: article.title }} />
          </div>
        </div>
        <div className="px-4 flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              {published(article.date)}
            </p>
            {article.articleCategory && (
              <Link
                href={categoryLink}
                className="text-xs bg-primary-500 rounded px-2 py-1 text-white font-medium hover:bg-primary-700"
              >
                {article.articleCategory.name}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center p-4">
        {article.source.image ? (
          <img
            src={article.source.image}
            width={36}
            height={36}
            alt={`Logo ${article.source.name}`}
            className="rounded-lg mr-2"
            loading="lazy"
          />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-primary-500 text-white flex items-center justify-center font-xl font-semibold mr-2 flex-shrink-0">
            {article.source.name.split(' ').slice(0, 2).map(n => n[0])}
          </div>
        )}
        <a
          href={`https://${article.source.url}`}
          target="_blank"
          className="font-medium hover:text-primary-500"
          rel="noopener noreferrer"
        >
          {article.source.name}
        </a>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-zinc-100 text-gray-700 ml-auto"
          aria-label="Bookmark Artikel"
          onClick={toggleBookmark}
        >
          {isBookmark ? <IconBookmark fill="#374151" /> : <IconBookmark />}
        </button>
      </div>
    </div>
  );
};

export default memo(ArticeCard);

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import { IconBookmark } from '@tabler/icons';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  FC, LegacyRef, memo, useState,
} from 'react';
import { utils } from '~/helpers';
import { Video } from '~/interfaces';

interface VideoCardProps {
  video: Video;
  innerRef?: LegacyRef<HTMLDivElement>;
  onBookmark?(): void;
}

const VideoCard: FC<VideoCardProps> = ({ video, innerRef, onBookmark }) => {
  const bookmarks: Video[] = typeof localStorage !== 'undefined' ? utils.getVideoBookmarks() : [];
  const [
    isBookmark, setIsBookmark,
  ] = useState(bookmarks.some(bookmark => bookmark.id === video.id));

  const onClick = () => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  const published = (date: string) => `${formatDistanceToNowStrict(new Date(date))} yang lalu`;

  const toggleBookmark = () => {
    utils.toggleVideoBookmark(video);
    setIsBookmark(prevState => !prevState);
    onBookmark?.();
  };

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
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="object-cover w-full h-44"
          />
          <span className="absolute top-36 right-4 rounded bg-gray-900/70 text-white text-xs font-medium px-1 py-0.5">
            {utils.duration(video.duration)}
          </span>
          <div className="p-4 pb-2">
            <h3 className="font-semibold" dangerouslySetInnerHTML={{ __html: video.title }} />
          </div>
        </div>
        <div className="px-4 flex-1">
          <p className="text-sm text-gray-700">
            {published(video.publishedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center p-4">
        <img
          src={video.channel.image}
          width={36}
          height={36}
          alt={`Logo ${video.channel.name}`}
          className="rounded-full mr-2"
          loading="lazy"
        />
        <a
          href={`https://www.youtube.com/@${video.channel.customUrl}`}
          target="_blank"
          className="font-medium hover:text-primary-500"
          rel="noopener noreferrer"
        >
          {video.channel.name}
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

export default memo(VideoCard);

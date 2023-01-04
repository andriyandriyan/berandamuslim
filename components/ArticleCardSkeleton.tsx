import { FC, memo } from 'react';

const ArticleCardSkeleton: FC = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map(n => (
      <div
        key={n}
        className="flex flex-col rounded-lg shadow-lg ring-1 ring-zinc-900/5 overflow-hidden animate-pulse"
      >
        <div className="w-full bg-gray-400 h-44" />
        <div className="p-4 pb-0">
          <div className="h-4 w-full bg-gray-400 rounded-lg mb-2" />
          <div className="h-4 w-2/3 bg-gray-400 rounded-lg mb-4" />
          <div className="h-3 w-20 bg-gray-400 rounded-lg" />
        </div>
        <div className="p-4 flex items-center">
          <div className="bg-gray-400 rounded-lg mr-2 h-9 w-9" />
          <div className="bg-gray-400 rounded-lg h-4 w-36" />
        </div>
      </div>
    ))}
  </>
);

export default memo(ArticleCardSkeleton);

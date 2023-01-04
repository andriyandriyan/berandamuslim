import { useCallback, useRef } from 'react';
import { Spinner } from '~/components';

interface Params {
  hasMore: boolean;
  isLoading: boolean;
  fetchNextPage(): void;
}

const useInfiniteScroll = ({ hasMore, isLoading, fetchNextPage }: Params) => {
  const observer = useRef<IntersectionObserver>();

  const ref = useCallback((element: HTMLDivElement) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (!hasMore) {
      return;
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        fetchNextPage();
      }
    });

    if (element) {
      observer.current.observe(element);
    }
  }, [hasMore, fetchNextPage]);

  const LoadMoreLoader = () => (isLoading ? (
    <div className="flex justify-center p-8">
      <Spinner />
    </div>
  ) : null);

  return { ref, LoadMoreLoader };
};

export default useInfiniteScroll;

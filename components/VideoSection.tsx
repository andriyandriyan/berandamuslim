import { IconListSearch, IconSearch, IconX } from '@tabler/icons';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  FC, FormEventHandler, useEffect, useState,
} from 'react';
import ReactSelect, { MultiValue } from 'react-select';
import { api } from '~/helpers';
import { useInfiniteScroll } from '~/hooks';
import { ResponseAPI, Video } from '~/interfaces';
import ModalVideo from './ModalVideo';
import VideoCard from './VideoCard';

interface Option {
  value: string;
  label: string;
}

interface Query {
  search?: string;
  channel?: string;
}

interface VideoSectionProps {
  initialData: ResponseAPI<Video[]>;
}

const VideoSection: FC<VideoSectionProps> = ({ initialData }) => {
  const { query, push } = useRouter();
  const { search = '', channel = '' }: Query = query;
  const [searchInput, setSearchInput] = useState(search);
  const [channelInput, setChannelInput] = useState(channel);
  const channelIds = channelInput.split(',');
  const [prevUrl, setPrevUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => setShowModal(false));
    }
  }, []);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const { data: channels, isLoading } = useQuery(['channels'], api.channels);

  const channelsData = (channels?.data || []).map(value => ({
    value: value.id,
    label: value.name,
  }));

  const {
    data, hasNextPage, isFetchingNextPage, fetchNextPage,
  } = useInfiniteQuery(['videos', search, channel], ({ pageParam = 1 }) => api.videos({
    page: pageParam,
    perPage: 18,
    search,
    channelIds: channel.split(',').filter(value => value),
  }), {
    getNextPageParam: (
      { meta }: ResponseAPI,
    ) => (meta?.nextPageUrl ? meta.currentPage + 1 : undefined),
    initialData: {
      pageParams: [1],
      pages: [initialData],
    },
  });

  const videos: Video[] = data?.pages
    .reduce((acc, page) => acc.concat(page.data), [] as Video[]) || [];

  const { LoadMoreLoader, ref } = useInfiniteScroll({
    hasMore: hasNextPage || false,
    fetchNextPage,
    isLoading: isFetchingNextPage,
  });

  const onChangeChannel = (values: MultiValue<Option>) => {
    const value = values.length ? values.map(val => val.value).join(',') : '';
    setChannelInput(value);
    if (!value) {
      const urlSearchParams = new URLSearchParams(document.location.search);
      urlSearchParams.delete('channel');
      push(`?${urlSearchParams.toString()}`);
    }
  };

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (searchInput || channelInput) {
      const urlSearchParams = new URLSearchParams(document.location.search);
      if (searchInput) {
        urlSearchParams.set('search', searchInput);
      } else {
        urlSearchParams.delete('search');
      }
      if (channelInput) {
        urlSearchParams.set('channel', channelInput);
      } else {
        urlSearchParams.delete('channel');
      }
      push(`?${urlSearchParams.toString()}`);
    }
  };

  const clearInput = () => {
    setSearchInput('');
    const urlSearchParams = new URLSearchParams(document.location.search);
    urlSearchParams.delete('search');
    push(`?${urlSearchParams.toString()}`);
  };

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

  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <form onSubmit={submit} className="w-full flex flex-col sm:flex-row">
          <ReactSelect
            value={channelsData.filter(value => channelIds.includes(value.value))}
            isMulti
            options={channelsData}
            isLoading={isLoading}
            placeholder="Semua Channel"
            className="text-sm z-[5] w-full sm:w-1/2"
            onChange={onChangeChannel}
            closeMenuOnSelect={false}
            classNames={{
              control: () => '!rounded-lg !border-gray-300',
              menu: () => '!rounded-lg',
              indicatorSeparator: () => '!bg-gray-300',
              indicatorsContainer: () => '!text-gray-300',
              placeholder: () => '!text-gray-400',
              option: state => {
                if (state.isSelected) {
                  return '!bg-primary-500';
                }
                return state.isFocused ? '!bg-primary-500/10' : 'bg-white';
              },
              multiValue: () => '!rounded !bg-primary-500/10',
            }}
            isClearable
            noOptionsMessage={() => 'Channel tidak ditemukan'}
          />
          <div className="flex relative mt-4 sm:ml-4 sm:mt-0 flex-1 h-[38px]">
            <input
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 w-full px-2.5 py-2 outline-none placeholder-gray-400"
              placeholder="Cari judul video"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="rounded-full p-2 hover:bg-zinc-100 text-gray-700 absolute right-11 top-[3px]"
                aria-label="Hapus pencarian"
                onClick={clearInput}
              >
                <IconX size={16} />
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-lg border border-l-0 border-gray-300"
            >
              <IconSearch size={16} />
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-4">
        {videos.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            innerRef={i === videos.length - 1 ? ref : undefined}
            onClick={onClick(video)}
          />
        ))}
      </div>
      <LoadMoreLoader />
      {data && !videos.length && (
        <div className="flex flex-col items-center justify-center pt-32">
          <IconListSearch className="text-gray-500 mb-4" size={64} />
          <h3 className="text-lg font-medium text-gray-900">Hasil pencarian tidak ditemukan</h3>
          <p className="text-sm text-gray-700">Coba ganti dengan kata kunci lain</p>
        </div>
      )}
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

export default VideoSection;

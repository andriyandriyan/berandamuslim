import { IconListSearch, IconSearch, IconX } from '@tabler/icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useState } from 'react';
import { GroupBase, SingleValue } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { ArticleCard, ArticleCardSkeleton, ScrollToTop } from '~/components';
import { api } from '~/helpers';
import { useInfiniteScroll } from '~/hooks';
import { Article, ResponseAPI } from '~/interfaces';

interface Option {
  value: string;
  label: string;
}
interface Additional {
  page: number;
}
type LoadOptionsType = LoadOptions<Option, GroupBase<Option>, Additional>;

const loadOptions: LoadOptionsType = async (search, _, additional) => {
  const page = additional?.page || 1;
  const { data, meta } = await api.articleCategories({
    perPage: 20,
    page,
    search,
  });

  return {
    options: data.map(datum => ({
      value: datum.slug,
      label: datum.name,
    })),
    hasMore: !!meta?.nextPageUrl,
    additional: {
      page: page + 1,
    },
  };
};

interface Query {
  search?: string;
  category?: string;
}

interface Data {
  data: ResponseAPI<Article[]>;
}

export const getServerSideProps: GetServerSideProps<Data> = async ({ req }) => {
  let search = '';
  let category = '';
  if (req.url) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    search = searchParams.get('search') || '';
    category = searchParams.get('category') || '';
  }
  const data = await api.articles({
    page: 1, perPage: 18, search, category,
  });

  return {
    props: {
      data: camelcaseKeys(data, { deep: true }),
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const { query, push } = useRouter();
  const { search = '', category = '' }: Query = query;
  const [searchInput, setSearchInput] = useState(search);
  const [categoryInput, setCategoryInput] = useState(category);
  const [categorySlug = '', categoryName = ''] = category.split('_');

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const {
    data: resData, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage,
  } = useInfiniteQuery(['articles', search, categorySlug], ({ pageParam = 1 }) => api.articles({
    page: pageParam,
    perPage: 18,
    search,
    category: categorySlug,
  }), {
    getNextPageParam: (
      { meta }: ResponseAPI,
    ) => (meta?.nextPageUrl ? meta.currentPage + 1 : undefined),
    initialData: {
      pageParams: [1],
      pages: [data],
    },
  });

  const articles: Article[] = resData?.pages
    .reduce((acc, page) => acc.concat(page.data), [] as Article[]) || [];

  const { LoadMoreLoader, ref } = useInfiniteScroll({
    hasMore: hasNextPage || false,
    fetchNextPage,
    isLoading: isFetchingNextPage,
  });

  const onChangeCategory = (option?: SingleValue<Option>) => {
    const value = option ? `${option.value}_${option.label}` : '';
    setCategoryInput(value);
    if (!value) {
      const urlSearchParams = new URLSearchParams(document.location.search);
      urlSearchParams.delete('category');
      push(`?${urlSearchParams.toString()}`);
    }
  };

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (searchInput || categoryInput) {
      const urlSearchParams = new URLSearchParams(document.location.search);
      if (searchInput) {
        urlSearchParams.set('search', searchInput);
      } else {
        urlSearchParams.delete('search');
      }
      if (categoryInput) {
        urlSearchParams.set('category', categoryInput);
      } else {
        urlSearchParams.delete('category');
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

  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <form onSubmit={submit} className="w-full md:max-w-xl flex flex-col sm:flex-row">
          <AsyncPaginate
            value={categorySlug ? {
              value: categorySlug,
              label: categoryName,
            } : undefined}
            loadOptions={loadOptions}
            onChange={onChangeCategory}
            additional={{
              page: 1,
            }}
            placeholder="Semua Kategori"
            className="text-sm z-[5] w-full sm:w-60"
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
            }}
            isClearable
            noOptionsMessage={() => 'Kategori tidak ditemukan'}
          />
          <div className="flex relative mt-4 sm:ml-4 sm:mt-0 flex-1">
            <input
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 w-full px-2.5 py-2 outline-none placeholder-gray-400"
              placeholder="Cari judul artikel"
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
        {isLoading && <ArticleCardSkeleton />}
        {articles.map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            innerRef={i === articles.length - 1 ? ref : undefined}
          />
        ))}
      </div>
      <LoadMoreLoader />
      {data && !articles.length && (
        <div className="flex flex-col items-center justify-center pt-32">
          <IconListSearch className="text-gray-500 mb-4" size={64} />
          <h3 className="text-lg font-medium text-gray-900">Hasil pencarian tidak ditemukan</h3>
          <p className="text-sm text-gray-700">Coba ganti dengan kata kunci lain</p>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default Home;

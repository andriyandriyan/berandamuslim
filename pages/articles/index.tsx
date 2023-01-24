import camelcaseKeys from 'camelcase-keys';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { ScrollToTop, ArticleSection } from '~/components';
import { api } from '~/helpers';
import { Article, ResponseAPI } from '~/interfaces';

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
    page: 1, perPage: 18, search, category: category ? category.split('_')[0] : '',
  });

  return {
    props: {
      data: camelcaseKeys(data, { deep: true }),
    },
  };
};

const Articles: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => (
  <div>
    <Head>
      <title>Artikel Islam - Beranda Muslim</title>
    </Head>
    <ArticleSection initialData={data} />
    <ScrollToTop />
  </div>
);

export default Articles;

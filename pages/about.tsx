/* eslint-disable max-len */
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { api } from '~/helpers';
import { ResponseAPI, Source } from '~/interfaces';

interface Data {
  data: ResponseAPI<Source[]>;
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const data = await api.sources();

  return {
    props: {
      data,
    },
  };
};

const About: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => (
  <>
    <Head>
      <title>Tentang Beranda Muslim</title>
    </Head>
    <div>
      <h1 className="font-semibold text-2xl mb-6">Tentang</h1>
      <p className="mb-4">
        Beranda Muslim adalah website yang berisi kumpulan artikel-artikel Islam yang telah dikumpulkan dari website-website Ahlusunnah bermanhaj salaf. Ada lebih dari 30.000 artikel di website ini dan akan selalu ditambahkan setiap harinya. Kalian dapat menggunakan pencarian untuk menemukan artikel tentang subjek tertentu atau kalian dapat menelusuri kategori.
      </p>
      <p>Artikel di website ini diambil dari website-website berikut:</p>
      <ol className="list-disc list-inside mb-4">
        {data.data.map(source => (
          <li key={source.id}>
            <a
              href={`https://${source.url}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary-500 hover:underline"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ol>
      <p className="mb-4">
        Kedepannya fitur website ini Insya Allah juga akan ditambahkan seperti berisi video kajian, jadwal kajian, poster dakwah, baca Al-Qur&apos;an, jadwal sholat serta bacaan dzikir dan doa.
      </p>
    </div>
  </>
);

export default About;

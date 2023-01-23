/* eslint-disable max-len */
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { api } from '~/helpers';
import { Channel, ResponseAPI, Source } from '~/interfaces';

interface Data {
  sources: ResponseAPI<Source[]>;
  channels: ResponseAPI<Channel[]>;
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const [sources, channels] = await Promise.all([
    api.sources(),
    api.channels(),
  ]);

  return {
    props: {
      sources,
      channels,
    },
  };
};

const About: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  sources, channels,
}) => (
  <>
    <Head>
      <title>Tentang Beranda Muslim</title>
    </Head>
    <div>
      <h1 className="font-semibold text-2xl mb-6">Tentang</h1>
      <p className="mb-4">
        Beranda Muslim adalah website yang berisi kumpulan artikel-artikel dan video kajian Islam yang telah dikumpulkan dari website-website dan channel Youtube Ahlusunnah bermanhaj salaf. Ada lebih dari 30.000 artikel dan lebih dari 120.000 video di website ini dan akan selalu ditambahkan setiap harinya. Kalian dapat menggunakan pencarian untuk menemukan artikel tentang subjek tertentu atau kalian dapat menelusuri kategori atau channel Youtube tertentu.
      </p>
      <p>Artikel di website ini diambil dari website-website berikut:</p>
      <ol className="list-disc list-inside mb-4">
        {sources.data.map(source => (
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
      <p>Sedangkan video kajian di website ini diambil dari channel-channel Youtube berikut:</p>
      <ol className="list-disc list-inside mb-4">
        {channels.data.map(channel => (
          <li key={channel.id}>
            <a
              href={`https://www.youtube.com/@${channel.customUrl}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary-500 hover:underline"
            >
              {channel.name}
            </a>
          </li>
        ))}
      </ol>
      <p className="mb-4">
        Kedepannya fitur website ini Insya Allah juga akan ditambahkan seperti berisi jadwal kajian, poster dakwah, baca Al-Qur&apos;an, jadwal sholat serta bacaan dzikir dan doa.
      </p>
    </div>
  </>
);

export default About;

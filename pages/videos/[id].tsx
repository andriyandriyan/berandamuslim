import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';
import { api } from '~/helpers';
import { ResponseAPI, Video } from '~/interfaces';

interface Data {
  video: ResponseAPI<Video>;
}

export const getServerSideProps: GetServerSideProps<Data, { id: string }> = async ({ params }) => {
  const { id = '' } = params!;
  return {
    props: {
      video: await api.detailVideo(id),
    },
  };
};

const DetailVideo: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  video,
}) => (
  <div>
    <iframe
      src={`https://www.youtube.com/embed/${video.data.id}`}
      title={video.data.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="w-full sm:max-w-4xl aspect-video mb-6"
    />
    <h1 className="font-semibold text-2xl">
      {video.data.title}
    </h1>
    <div className="flex items-center p-4">
      <Image
        src={video.data.channel.image}
        width={36}
        height={36}
        alt={`Logo ${video.data.channel.name}`}
        className="rounded-full mr-2"
        loading="lazy"
      />
      <a
        href={`https://www.youtube.com/@${video.data.channel.customUrl}`}
        target="_blank"
        className="font-medium hover:text-primary-500"
        rel="noopener noreferrer"
      >
        {video.data.channel.name}
      </a>
    </div>
  </div>
);

export default DetailVideo;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconCircleCheck } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, useState } from 'react';
import { Spinner } from '~/components';
import { api } from '~/helpers';

const Feedback: NextPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    mutate, isLoading,
  } = useMutation(() => api.sendFeedback(name, message), {
    onSuccess: () => {
      setName('');
      setMessage('');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!isLoading) {
      mutate();
    }
  };

  return (
    <>
      <Head>
        <title>Feedback Beranda Muslim</title>
      </Head>
      <div>
        <h1 className="font-semibold text-2xl mb-6">Feedback untuk Beranda Muslim</h1>
        {showSuccess && (
          <div className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50" role="alert">
            <IconCircleCheck className="flex-shrink-0 inline w-5 h-5 mr-3" />
            <span className="sr-only">Sukses</span>
            <div>
              <span className="font-medium">Feedback berhasil dikirim</span>
              <p>Terima kasih atas feedback-nya.</p>
            </div>
          </div>
        )}
        <form className="max-w-lg sm:w-full" onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Nama Anda"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pesan
            </label>
            <textarea
              id="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Pesan Anda"
              rows={3}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={clsx(
              'text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center relative',
              isLoading ? 'bg-primary-400 hover:bg-primary-500 cursor-not-allowed' : 'bg-primary-700 hover:bg-primary-800',
            )}
            disabled={isLoading}
          >
            <span className={clsx(isLoading && 'opacity-0')}>Kirim</span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size="sm" />
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;

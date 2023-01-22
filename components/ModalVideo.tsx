import {
  FC, Fragment, memo, useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Video } from '~/interfaces';
import { IconX } from '@tabler/icons';

interface ModalVideoProps {
  show: boolean;
  onHide(): void;
  video: Video;
}

const ModalVideo: FC<ModalVideoProps> = ({ show, onHide, video }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onHide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-4xl">
                <div className="bg-white p-4 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h1 className="font-semibold text-xl mr-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{video.title}</h1>
                    <button
                      type="button"
                      className="rounded-full p-2 hover:bg-zinc-100 text-gray-700 ml-auto"
                      aria-label="Tutup modal"
                      onClick={onHide}
                    >
                      <IconX />
                    </button>
                  </div>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full sm:max-w-4xl aspect-video"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(ModalVideo);

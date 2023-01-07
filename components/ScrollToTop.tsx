import { IconChevronUp } from '@tabler/icons';
import { FC, memo } from 'react';

const ScrollToTop: FC = () => (
  <button
    type="button"
    className="fixed right-4 bottom-24 lg:bottom-4 shadow-lg rounded-full bg-primary-500 text-white p-3"
    aria-label="Scroll to Top"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <IconChevronUp />
  </button>
);

export default memo(ScrollToTop);

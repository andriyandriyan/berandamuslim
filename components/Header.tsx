import { FC, memo } from 'react';

const Header: FC = () => (
  <header className="w-full flex p-4 border-b fixed top-0 left-0 z-10 bg-white">
    <div>Beranda Muslim</div>
  </header>
);

export default memo(Header);

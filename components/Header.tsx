import Image from 'next/image';
import { FC, memo } from 'react';

const Header: FC = () => (
  <header className="w-full flex px-4 py-2 border-b fixed top-0 left-0 z-10 bg-white">
    <Image src="/berandamuslim-logo.png" alt="Logo Beranda Muslim" height={50} width={134} />
  </header>
);

export default memo(Header);

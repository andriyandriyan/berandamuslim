import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import menus from '~/menus';

const Aside: FC = () => {
  const { pathname } = useRouter();

  return (
    <aside className="hidden lg:block border-r w-60 h-screen fixed left-0 top-14">
      <nav className="py-4 w-full">
        <ul>
          {menus.map(menu => (
            <li key={menu.text}>
              <Link
                href={menu.path}
                type="button"
                className={clsx(
                  'w-full py-2 px-4 hover:bg-primary-500 text-sm flex items-center hover:text-white',
                  pathname === menu.path ? 'bg-primary-500 text-white' : 'text-gray-700',
                )}
              >
                <menu.icon size={21} className="mr-2" />
                {menu.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Aside);

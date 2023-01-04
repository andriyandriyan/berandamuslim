import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import menus from '~/menus';

const BottomNav: FC = () => {
  const { pathname } = useRouter();

  return (
    <div className="lg:hidden border-t w-full fixed left-0 bottom-0 bg-white z-10">
      <nav className="py-4 w-full">
        <ul className="flex justify-around">
          {menus.map(menu => (
            <li key={menu.text}>
              <Link
                href={menu.path}
                type="button"
                className={clsx(
                  'flex flex-col hover:text-primary-500 text-sm items-center text-gray-700',
                  pathname === menu.path && 'text-primary-500',
                )}
              >
                <menu.icon className="mb-1" />
                <span className="text-xs">{menu.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default memo(BottomNav);

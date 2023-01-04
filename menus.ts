import {
  IconBookmarks, IconHome, IconInfoCircle, TablerIcon,
} from '@tabler/icons';

interface Menu {
  icon: TablerIcon;
  text: string;
  path: string;
}

const menus: Menu[] = [
  {
    icon: IconHome,
    text: 'Beranda',
    path: '/',
  },
  {
    icon: IconBookmarks,
    text: 'Bookmark',
    path: '/bookmarks',
  },
  {
    icon: IconInfoCircle,
    text: 'Tentang',
    path: '/about',
  },
];

export default menus;

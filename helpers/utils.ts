import { Article } from '~/interfaces';

const bookmarksStorage = 'BOOKMARKS_STORAGE';

const utils = {
  getBookmarks(): Article[] {
    const bookmarks: Article[] = JSON.parse(localStorage.getItem(bookmarksStorage) || '[]');
    return bookmarks;
  },
  setBookmarks(articles: Article[]): Article[] {
    localStorage.setItem(bookmarksStorage, JSON.stringify(articles));
    return this.getBookmarks();
  },
  toggleBookmark(article: Article): Article[] {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex(bookmark => bookmark.id === article.id);
    if (index >= 0) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.unshift(article);
    }
    return this.setBookmarks(bookmarks);
  },
};

export default utils;

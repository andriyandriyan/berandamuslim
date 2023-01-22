import { Article, Video } from '~/interfaces';

const articleBookmarksStorage = 'ARTICLE_BOOKMARKS_STORAGE';
const videoBookmarksStorage = 'VIDEO_BOOKMARKS_STORAGE';

const utils = {
  getArticleBookmarks(): Article[] {
    const bookmarks: Article[] = JSON.parse(localStorage.getItem(articleBookmarksStorage) || '[]');
    return bookmarks;
  },
  setArticleBookmarks(articles: Article[]): Article[] {
    localStorage.setItem(articleBookmarksStorage, JSON.stringify(articles));
    return this.getArticleBookmarks();
  },
  toggleArticleBookmark(article: Article): Article[] {
    const bookmarks = this.getArticleBookmarks();
    const index = bookmarks.findIndex(bookmark => bookmark.id === article.id);
    if (index >= 0) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.unshift(article);
    }
    return this.setArticleBookmarks(bookmarks);
  },
  getVideoBookmarks(): Video[] {
    const bookmarks: Video[] = JSON.parse(localStorage.getItem(videoBookmarksStorage) || '[]');
    return bookmarks;
  },
  setVideoBookmarks(videos: Video[]): Video[] {
    localStorage.setItem(videoBookmarksStorage, JSON.stringify(videos));
    return this.getVideoBookmarks();
  },
  toggleVideoBookmark(video: Video): Video[] {
    const bookmarks = this.getVideoBookmarks();
    const index = bookmarks.findIndex(bookmark => bookmark.id === video.id);
    if (index >= 0) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.unshift(video);
    }
    return this.setVideoBookmarks(bookmarks);
  },
  duration(value: string) {
    const timeExtractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
    const extracted = timeExtractor.exec(value);
    if (extracted) {
      const hour = parseInt(extracted[2], 10) || 0;
      const minute = (parseInt(extracted[3], 10) || 0).toString().padStart(2, '0');
      const second = (parseInt(extracted[4], 10) || 0).toString().padStart(2, '0');
      const formatted: string[] = [minute, second];
      if (hour) {
        formatted.unshift(hour.toString());
      }
      return formatted.join(':');
    }
    return 0;
  },
};

export default utils;

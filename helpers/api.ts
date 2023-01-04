import { AxiosResponse } from 'axios';
import {
  Article, ArticleCategory, ArticleParams, BaseParams, ResponseAPI, Source,
} from '../interfaces';
import http from './http';

const apiHandler = async <T>(
  request: Promise<AxiosResponse<ResponseAPI<T>>>,
): Promise<ResponseAPI<T>> => {
  try {
    return (await request).data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const api = {
  sources() {
    return apiHandler<Source[]>(http.get('sources'));
  },
  articleCategories(params: BaseParams) {
    return apiHandler<ArticleCategory[]>(http.get('article-categories', { params }));
  },
  articles(params: ArticleParams) {
    return apiHandler<Article[]>(http.get('articles', { params }));
  },
  sendFeedback(name: string, message: string) {
    return apiHandler(http.post('feedbacks', { name, message }));
  },
};

export default api;

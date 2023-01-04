import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const http = axios.create({ baseURL });

http.interceptors.response.use(res => {
  if (typeof window !== 'undefined') {
    return camelcaseKeys(res, { deep: true });
  }
  return res;
});

export default http;

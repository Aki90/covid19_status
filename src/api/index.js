import axios from 'axios';
import { setInterceptors } from '@/utils/interceptors.js';

// API Key 값 설정

// Axios 초기화
function createInstance(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });

  return setInterceptors(instance);
}

const instanceKorea = createInstance('/korea');
const instanceGlobal = createInstance('/global');

// 국내 환자 조회
export function fetchKoreaData(locale) {
  return instanceKorea.get('', {
    params: { locale: locale },
  });
}

// 해외 환자 조회
export function fetchGlobalData(nation) {
  return instanceGlobal.get('', { params: { nation: nation } });
}

import axios from 'axios';

// Axios 초기화
function createInstance(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });

  return instance;
}

const instance = createInstance('');

// 국내 환자 조회
export function fetchKoreaData(locale) {
  return instance.get('/korea', {
    params: { locale: locale },
  });
}

// 해외 환자 조회
export function fetchGlobalData(nation) {
  return instance.get('/global', { params: { nation: nation } });
}

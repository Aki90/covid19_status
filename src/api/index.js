import axios from 'axios';

// API Key 값 설정
axios.defaults.headers['APIKey'] = process.env.VUE_APP_API_KEY;

// 국내 환자 조회
export function fetchKoreaData(locale) {
  return axios.get('/api/korea', { params: { locale: locale } });
}

// 해외 환자 조회
export function fetchGlobalData(nation) {
  return axios.get('/api/global', { params: { nation: nation } });
}

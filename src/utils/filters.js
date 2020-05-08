// UNIX 값 시간 변환 함수
export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  let hours = date.getHours();
  hours = hours > 9 ? hours : `0${hours}`;
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function makeComma(val) {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

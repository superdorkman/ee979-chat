import { API_URL } from '../constants/url';

const session = localStorage.session && JSON.parse(localStorage.session);
const token = session ? session.id : '';

export const WrapToken = (path) => {
  return `${API_URL}${path}?access_token=${token}`;
}

export const parseUrl = (query) => {
  query = decodeURI(query.slice(1));
  let params = {};
  query.split('&').forEach(item => {
    let [key, val] = item.split('=');
    if (key === 'extra') {
      params[key] = JSON.parse(val);
    } else {
      params[key] = val;
    }
  });

  return params;
}
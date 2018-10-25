import axios from 'axios';
import { s } from '../index';
import { API_URL } from '../constants/url';

export const setPersonalInfo = () => {
  axios.get(`${API_URL}/Members/myAllInfo`)
    .then(res => {
      const { data, error } = res.data;
      if (data) {
        s.dispatch({
          type: 'SET_PERSONAL_INFO',
          info: data
        })
      }
    }).catch(err => {});
}
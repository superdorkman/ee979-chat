import axios from 'axios';
import { ALI_URL, API_URL } from '../constants/url';
import * as sha1 from 'js-sha1';

//获取阿里云参数
export const getOssKey = () => {
  return axios.get(`${API_URL}/AliyunOsses/token`);
}

//上传图片
export const uploadImg = (data, img = null, blob = null) => {
    
  const formData = new FormData();
  formData.append('key', data['dir'] + sha1(Date.now().toString()));
  for (let key in data) {
    formData.append(key, data[key]);
  }
  if (img) {
    formData.append('file', img.files[0]);
  } else if (blob) {
    formData.append('Content-Length', (Math.round(blob.size * 100 / 1024) / 100).toString()); 
    formData.append('file', blob);
  }

  return axios.post(ALI_URL, formData);
}
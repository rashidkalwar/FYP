import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).accessToken
    }`;
  }

  return req;
});

export { API, BASE_URL };

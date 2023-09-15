import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer${
      JSON.parse(localStorage.getItem('user')).user_token
    }`;
  }

  return req;
});

export const userRegister = (formData) =>
  API.post('/api/user/register', formData);
export const userLogin = (formValues) =>
  API.post('/api/user/login', formValues);
export const signInGoogle = (accessToken) =>
  API.post('/api/user/google', {
    googleAccessToken: accessToken,
  });
export { API, BASE_URL };

import { API } from '../../utils/API';

export const userRegister = (formData) =>
  API.post('/api/user/register', formData);
export const userLogin = (formValues) =>
  API.post('/api/user/login', formValues);
export const signInGoogle = (accessToken) =>
  API.post('/api/user/google', {
    googleAccessToken: accessToken,
  });

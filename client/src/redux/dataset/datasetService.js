import { API } from '../../utils/API';

export const addDataset = (formData) => API.post('/api/dataset', formData);
// export const getDataset = (formValues) =>
//   API.post('/api/user/login', formValues);
// export const getDatasets = (accessToken) =>
//   API.post('/api/user/google', {
//     googleAccessToken: accessToken,
//   });
// export const updateDataset = (formData) =>
//   API.post('/api/user/register', formData);
// export const deleteDataset = (formValues) =>
//   API.post('/api/user/login', formValues);

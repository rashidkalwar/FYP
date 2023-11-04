import { API } from '../../utils/API';

export const addDataset = (formData) => API.post('/api/dataset', formData);
export const getDatasets = () => API.get('/api/dataset');
// export const getDataset = (formValues) =>
//   API.post('/api/user/login', formValues);
// export const updateDataset = (formData) =>
//   API.post('/api/user/register', formData);
// export const deleteDataset = (formValues) =>
//   API.post('/api/user/login', formValues);

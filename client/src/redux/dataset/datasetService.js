import { API } from '../../utils/API';

export const addDataset = (formData) => API.post('/api/dataset', formData);
export const getDataset = (slug) => API.get(`/api/dataset/${slug}`);
export const getDatasets = () => API.get('/api/dataset');
export const updateDataset = (slug, formData) =>
  API.put(`/api/dataset/${slug}`, formData);
export const deleteDataset = (slug) => API.delete(`/api/dataset/${slug}`);

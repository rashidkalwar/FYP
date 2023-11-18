import { API } from '../../utils/API';

export const addVisualization = (formData) =>
  API.post('/api/visualization', formData);
export const getVisualization = (id) => API.get(`/api/visualization/${id}`);
export const getVisualizations = () => API.get('/api/visualization');
export const updateVisualization = (id, formData) =>
  API.put(`/api/visualization/${id}`, formData);
export const deleteVisualization = (id) =>
  API.delete(`/api/visualization/${id}`);

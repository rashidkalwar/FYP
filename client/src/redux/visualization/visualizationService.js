import { API } from '../../utils/API';

export const addVisualization = (formData) =>
  API.post('/api/visualization', formData);

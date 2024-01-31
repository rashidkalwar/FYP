import { API } from '../../utils/API';

export const getChart = (id) => API.get(`/api/charts/${id}`);

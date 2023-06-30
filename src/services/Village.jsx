import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const projectMetric = (queryParams) => {
  const url = `${API_BASE_URL}/bs_prj_vlge_1?${queryParams}`;
  return axios.get(url);
};

export const Beneficiary = (queryParams) => {
    const url = `${API_BASE_URL}/bs_prj_vlge_3?${queryParams}`;
    return axios.get(url);
};
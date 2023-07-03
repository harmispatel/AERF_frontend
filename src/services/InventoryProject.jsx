import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const inventory_data = (queryParams) => {
  const url = `${API_BASE_URL}/bs_inv_1?${queryParams}`;
  return axios.get(url);
};

export const intent_details = (queryParams) => {
    const url = `${API_BASE_URL}/bs_inv_2?${queryParams}`;
    return axios.get(url);
};

export const distribution = (queryParams) => {
    const url = `${API_BASE_URL}/bs_inv_3?${queryParams}`;
    return axios.get(url);
};
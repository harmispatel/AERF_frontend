import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const orders = (queryParams) => {
  const url = `${API_BASE_URL}/bs_ord_1?${queryParams}`;
  return axios.get(url);
};

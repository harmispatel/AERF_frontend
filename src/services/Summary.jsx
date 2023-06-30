import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const monthlyGraph = (queryParams) => {
  const url = `${API_BASE_URL}/bs_prj_smry_3?${queryParams}`;
  return axios.get(url);
};

export const impactValues= (queryParams) => {
   const url = `${API_BASE_URL}/bs_prj_smry_4?${queryParams}`;
   return axios.get(url);
};

export const unitGraph= (queryParams) => {
    const url = `${API_BASE_URL}/bs_prj_smry_5?${queryParams}`;
    return axios.get(url);
 };



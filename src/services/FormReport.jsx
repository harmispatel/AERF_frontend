import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const survey_info = (queryParams) => {
  const url = `${API_BASE_URL}/bs_frm_1?${queryParams}`;
  return axios.get(url);
};

export const active_question = (queryParams) => {
    const url = `${API_BASE_URL}/bs_frm_2?${queryParams}`;
    return axios.get(url);
};

export const question_responses = (queryParams) => {
    const url = `${API_BASE_URL}/bs_frm_3?${queryParams}`;
    return axios.get(url);
};

export const profile_info = (profileQuery) => {
    const url = `${API_BASE_URL}/bs_frm_4_bn_dt?${profileQuery}`;
    return axios.get(url);
};
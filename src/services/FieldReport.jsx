import axios from 'axios';

const API_BASE_URL = 'http://13.234.16.28:6050';

export const field_report_activity = (queryParams) => {
  const url = `${API_BASE_URL}/bs_fld_1?${queryParams}`;
  return axios.get(url);
};

export const survey_graph = (queryParams) => {
    const url = `${API_BASE_URL}/bs_fld_2?${queryParams}`;
    return axios.get(url);
};

export const site_wise = (queryParams) => {
    const url = `${API_BASE_URL}/bs_fld_3?${queryParams}`;
    return axios.get(url);
}

export const question_response = (queryParams) => {
    const url = `${API_BASE_URL}/bs_fld_4?${queryParams}`;
    return axios.get(url);
}
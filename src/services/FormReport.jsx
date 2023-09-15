import call from "./Call";

const survey_info = async (queryParams) => {
  let d = await call({
    path: `bs_frm_1?${queryParams}`,
    method: "GET",
  });
  return d;
};
const active_question = async (queryParams) => {
  let d = await call({
    path: `bs_frm_2?${queryParams}`,
    method: "GET",
  });
  return d;
};
const question_responses = async (queryParams) => {
  let d = await call({
    path: `bs_frm_3?${queryParams}`,
    method: "GET",
  });
  return d;
};
const profile_info = async (queryParams) => {
  let d = await call({
    path: `bs_frm_4_bn_dt?${queryParams}`,
    method: "GET",
  });
  return d;
};
const Beneficiary_search = async (queryParams) => {
  let d = await call({
    path: `bs_frm_beneficiaryList?${queryParams}`,
    method: "GET",
  });
  return d;
};
const Beneficiary_Data = async (queryParams) => {
  let d = await call({
    path: `bs_frm_3?${queryParams}`,
    method: "GET",
  });
  return d;
};
const Bulk_data = async (queryParams) => {
  let d = await call({
    path: `bs_frm_blk_dwnld?${queryParams}`,
    method: "GET",
  });
  return d;
};


const exportObject = {Beneficiary_Data,profile_info,question_responses,active_question,survey_info,Beneficiary_search,Bulk_data}

export default exportObject
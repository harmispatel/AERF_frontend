import call from "../Call";

const surveyId = async (queryParams) => {
  let d = await call({
    path: `bs_frm_survey_filter?${queryParams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {surveyId}

export default exportObject
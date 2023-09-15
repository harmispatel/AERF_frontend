import call from './Call';

const field_report_activity = async (queryParams) => {
    let d = await call({
      path: `bs_fld_1?${queryParams}`,
      method: "GET",
    });
    return d;
 };

 const survey_graph = async (queryParams) => {
    let d = await call({
      path: `bs_fld_2?${queryParams}`,
      method: "GET",
    });
    return d;
 };
 
 const site_wise = async (queryParams) => {
    let d = await call({
      path: `bs_fld_3?${queryParams}`,
      method: "GET",
    });
    return d;
 };

 const question_response = async (queryParams) => {
    let d = await call({
      path: `bs_fld_4?${queryParams}`,
      method: "GET",
    });
    return d;
 };

 const exportObject = {site_wise,survey_graph,field_report_activity,question_response}

export default exportObject
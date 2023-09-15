import call from './Call';

const projectMetric = async (queryParams) => {
  let d = await call({
    path: `bs_prj_vlge_1?${queryParams}`,
    method: "GET",
  });
  return d;
};

const Beneficiary = async (queryParams) => {
  let d = await call({
    path: `bs_prj_vlge_3?${queryParams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {projectMetric,Beneficiary}

export default exportObject
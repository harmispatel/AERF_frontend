import call from "./Call";

const projectMatrix = async (queryParams) => {
   let d = await call({
     path: `bs_prj_smry_1?${queryParams}`,
     method: "GET",
   });
   return d;
};

const villages = async (queryParams) => {
  let d = await call({
    path: `bs_prj_smry_2?${queryParams}`,
    method: "GET",
  });
  return d;
};

const monthlyGraph = async (queryParams) => {
   let d = await call({
     path: `bs_prj_smry_3?${queryParams}`,
     method: "GET",
   });
   return d;
};

const impactValues = async (queryParams) => {
   let d = await call({
     path: `bs_prj_smry_4?${queryParams}`,
     method: "GET",
   });
   return d;
};

const unitGraph = async (queryParams) => {
   let d = await call({
     path: `bs_prj_smry_5?${queryParams}`,
     method: "GET",
   });
   return d;
};

const exportObject = {projectMatrix,monthlyGraph,impactValues,unitGraph,villages}

export default exportObject
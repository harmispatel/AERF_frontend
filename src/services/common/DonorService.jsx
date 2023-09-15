import call from "../Call";

const donorId = async (queryParams) => {
  let d = await call({
    path: `bs_fld_donor_filter?${queryParams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {donorId}

export default exportObject
import call from "./Call";

const inventory_data = async (queryParams) => {
  let d = await call({
    path: `bs_inv_1?${queryParams}`,
    method: "GET",
  });
  return d;
};
const intent_details = async (queryParams) => {
  let d = await call({
    path: `bs_inv_2?${queryParams}`,
    method: "GET",
  });
  return d;
};
const distribution = async (queryParams) => {
  let d = await call({
    path: `bs_inv_3?${queryParams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {inventory_data,intent_details,distribution}

export default exportObject
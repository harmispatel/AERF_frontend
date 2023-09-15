import call from "./Call";

const dropdowns = async (queryParams) => {
  let d = await call({
    path: `bs_ord_3_form?${queryParams}`,
    method: "GET",
  });
  return d;
};

const orders = async (queryParams) => {
  let d = await call({
    path: `bs_ord_1?${queryParams}`,
    method: "GET",
  });
  return d;
};

const insert_data = async (data) => {
  let d = await call({
    path: "bs_ord_2_insert/",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const get_data = async (data) => {
  let d = await call({
    path: `bs_ord_intentData/?intent_id=${data}`,
    method: "get",
    enctype:"multipart/form-data",
    // data,
  });
  return d;
};

const update_data = async (data) => {
  let d = await call({
    path: "bs_ord_2_update/",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const delete_data = async (data) => {
  let d = await call({
    path: "bs_ord_2_delete/",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const update_delivery = async (data) => {
  let d = await call({
    path: "bs_ord_2_updatedelivery/",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const exportObject = {dropdowns,orders,insert_data,get_data,update_data,delete_data,update_delivery}

export default exportObject
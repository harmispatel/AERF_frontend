import call from "../Call";

const staff = localStorage.getItem('staff') 
const donor = localStorage.getItem('donor')

  if (donor !== null) {
    var filterparams = `donor_master_id=&staff_master_id=${staff}`;
  }else{
    var filterparams = `donor_master_id=${donor === null ? '' : donor }&staff_master_id=${staff}`;
  }

const VillageId = async () => {
  let d = await call({
    path: `bs_prj_smry_location_filter?${filterparams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {VillageId}

export default exportObject

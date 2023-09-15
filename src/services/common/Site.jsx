
import call from "../Call";

const staff = localStorage.getItem('staff') 
const donor = localStorage.getItem('donor')

  if (donor !== null) {
    var filterparams = `donor_master_id=&staff_master_id=${staff}`;
  }else{
    var filterparams = `donor_master_id=${donor === null ? '' : donor }&staff_master_id=${staff}`;
  }

const siteId = async () => {
  let d = await call({
    path: `bs_fld_site_filter?${filterparams}`,
    method: "GET",
  });
  return d;
};

const exportObject = {siteId}

export default exportObject
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import DonorService from "../../services/common/DonorService";

const Donor = (props) => {
  const [Donors, SetDonors] = useState([]);

  useEffect(() => {
    Data();
  }, []);

  const staff = localStorage.getItem("staff");
  const donor = localStorage.getItem("donor");

  if (donor !== null) {
    var queryParams = `donor_master_id=&staff_master_id=${staff}`;
  } else {
    var queryParams = `donor_master_id=${
      donor === null ? "" : donor
    }&staff_master_id=${staff}`;
  }
  const Data = async () => {
    await DonorService.donorId(queryParams)
      .then((response) => {
        SetDonors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <select className="form-select" value={props.donordata} onChange={(e) => props.setdata(e.target.value)} aria-label="Default select example">
        <option disabled value="">Donor</option>
        {Donors.map((data, id) => {
          return (
            <>
              <option key={id} value={data.d_phase_id}>
                {data.d_phase_name}
              </option>
            </>
          );
        })}
      </select>
      <span className="icon-box">
        <FaAngleDown className="icon" />
      </span>
    </>
  );
};

export default Donor;

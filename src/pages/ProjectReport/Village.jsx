import React, { useEffect, useState } from "react";
import "../index.css";
import { FaAngleDown, FaDownload } from "react-icons/fa6";
import { CSVLink } from "react-csv";
import StartMonth from "../../components/filters/StartMonth";
import Donor from "../../components/filters/Donor";
import moment from "moment";
import DataBox from "../../components/filters/DataBox";
import VillageFilter from "../../services/common/Village";
import VillageService from "../../services/Village";
import noData from "../../assets/images/no_data.jpeg";
import EndMonth from "../../components/filters/EndMonth";

const Village = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [DonorData, setDonorData] = useState("");
  const [villageData, setVillageData] = useState([]);
  const [selectVillage, setSelectVillage] = useState("");
  const [selectWadi, setSelectWadi] = useState(selectVillage);
  const [metricsData, setMetricsData] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState([]);

  useEffect(() => {
    filterData();
    setSelectWadi("");
  }, [selectVillage]);

  useEffect(()=>{
    const params = sessionStorage.getItem("village_filter")
   
    const startMonthFromSession = sessionStorage.getItem("villageStartMonth");
    const endMonthFromSession = sessionStorage.getItem("villageEndMonth");
    const donorIdFromSession = sessionStorage.getItem("villageDonor_id");
    const wadiIdFromSession = sessionStorage.getItem("villageWadi_id");
    
    if (startMonthFromSession || endMonthFromSession || donorIdFromSession ) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
      setDonorData(donorIdFromSession);
      setSelectWadi(wadiIdFromSession)
    }

     fetchData(params);
     beneficiary_Data(params);
     filterData(params);
    
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startMonth = moment(startDate).format("yyyy-MM-DD");
    const endMonth = moment(endDate).format("yyyy-MM-DD");
    const donorId = DonorData;
    const wadi_id = selectWadi;

    const queryParams = `wadi_id=${wadi_id}&donor_id=${donorId}&start_date=${startMonth}&end_date=${endMonth}`
    sessionStorage.setItem("village_filter", queryParams);
    sessionStorage.setItem("villageStartMonth", startMonth);
    sessionStorage.setItem("villageEndMonth", endMonth);
    sessionStorage.setItem("villageDonor_id", donorId);
    sessionStorage.setItem("villageWadi_id", wadi_id);

    try {
      await fetchData(queryParams);
      await beneficiary_Data(queryParams);
      await filterData(queryParams);

      // All APIs were successfully called and data is set in their respective states.
      console.log("All API calls completed successfully.");
    } catch (error) {
      console.error("Error in one or more API calls:", error);
    }
  };

  const filterData = async () => {
    return VillageFilter.VillageId()
      .then((response) => {
        setVillageData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = async (queryParams) => {
    return VillageService.projectMetric(queryParams)
      .then((response) => {
        setMetricsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const beneficiary_Data = (queryParams) => {
    return VillageService.Beneficiary(queryParams)
      .then((response) => {
        setBeneficiaryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const village = [...new Set(villageData.map((q) => q.a_village_name))];

  return (
    <>
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen="750"
      >
        <div className="village_main">
          <div className="fillter_part">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-1">
                  <div className="fillter_box">
                    <h3>Filter</h3>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <select
                        className="form-select form-control"
                        value={selectVillage}
                        onChange={(e) => setSelectVillage(e.target.value)}
                      >
                        <option disabled value="">
                          Village
                        </option>
                        {village.map((data, id) => {
                          return (
                            <option key={id} value={data}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                      <span className="icon-box">
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <select
                        className="form-select form-control"
                        value={selectWadi}
                        onChange={(e) => setSelectWadi(e.target.value)}
                      >
                        <option disabled value="">
                          Wadi
                        </option>
                        {villageData
                          .filter(
                            (data) => selectVillage === data.a_village_name
                          )
                          .map((data, id) => {
                            return (
                              <React.Fragment key={id}>
                                <option value={data.a_location_id}>
                                  {data.a_hamlet_name}
                                </option>
                              </React.Fragment>
                            );
                          })}
                      </select>
                      <span className="icon-box">
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <StartMonth
                        selected={startDate}
                        setdate={setStartDate}
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <EndMonth
                        selected={endDate}
                        setdate={setEndDate}
                        startDate={endDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-1">
                  <div className="fillter_box">
                    <div className="form-group">
                      <Donor donordata={DonorData} setdata={setDonorData} />
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <butoon
                    type="button"
                    onClick={handleSubmit}
                    className="btn admin-btn"
                  >
                    Submit
                  </butoon>
                </div>
              </div>
            </div>
          </div>
          <div className="village_detail_main">
            <div className="row">
              <div className="col-md-6">
                <div className="village_detail_inr">
                  <h2>Project Metrics</h2>
                  {metricsData?.length === 0 || metricsData === undefined ? (
                    <div className="text-center">
                      <img src={noData} alt="no_data" height={180} />
                    </div>
                  ) : (
                    <>
                      {metricsData.map((data) => {
                        return (
                          <div className="village_detail_box_main">
                            <DataBox
                              className1="village_detail_box"
                              amount={data.beneficiary_household_impacted?.toFixed()}
                              name="Beneficiaries Household Impacted"
                            />
                            <DataBox
                              className1="village_detail_box"
                              amount={data.Total_lives_impacted?.toFixed()}
                              name="Total Lives Impacted"
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="location_map">
                  <h2>Loation Map</h2>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14687.267328509402!2d72.50919378874067!3d23.03049666426422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b353bc60d91%3A0xd5e48ea22ff8d924!2sSatellite%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687768788421!5m2!1sen!2sin"
                    className="w-100 border-0"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="data_table">
            <div className="data_table_header">
              <h2>Beneficiary Data</h2>
              <span className="csv_bt">
                {beneficiaryData !== undefined && (
                  <CSVLink
                    data={beneficiaryData}
                    filename={"Village-Beneficiary-Data"}
                  >
                    <FaDownload className="icon" />
                  </CSVLink>
                )}
              </span>
            </div>
            <div className="scroll_table">
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Distribution</th>
                    <th>Village</th>
                    <th>Block</th>
                    <th>Wadi</th>
                  </tr>
                </thead>
                {beneficiaryData?.length === 0 ||
                beneficiaryData === undefined ? (
                  <tbody>
                    <tr>
                      <td colspan="6" class="text-center">
                        <span className="text-danger">
                          <strong>No Data Available</strong>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {beneficiaryData.map((data, id) => {
                      return (
                        <>
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{data.Name}</td>
                            <td>{data.date}</td>
                            <td>{data.Village}</td>
                            <td>{data.Block}</td>
                            <td>{data.Wadi}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Village;

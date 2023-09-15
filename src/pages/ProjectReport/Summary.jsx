import React, { useEffect, useState } from "react";
import "../index.css";
import moment from "moment";
import Donor from "../../components/filters/Donor";
import DataBox from "../../components/filters/DataBox";
import BarChart from "../../components/graphs/BarChart";
import LinesChart from "../../components/graphs/LineChart";
import SummaryService from "../../services/Summary";
import noData from "../../assets/images/no_data.jpeg";
import { Bar,CartesianGrid,ComposedChart,Tooltip,XAxis,YAxis } from "recharts";
import StartMonth from "../../components/filters/StartMonth";
import EndMonth from "../../components/filters/EndMonth";

const Summary = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [DonorData, setDonorData] = useState("");
  const [overAllProject, setOverAllProject] = useState("");
  const [villageData, setVillageData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [impactAnalyasis, setImpactAnalyasis] = useState([]);
  const [unitAnalyasis, setUnitAnalyasis] = useState([]);

  useEffect(()=>{
    const params = sessionStorage.getItem("summary_filter")
   
    const startMonthFromSession = sessionStorage.getItem("sumryStartMonth");
    const endMonthFromSession = sessionStorage.getItem("sumryEndMonth");
    const donorIdFromSession = sessionStorage.getItem("sumryDonor_id")

    if (startMonthFromSession || endMonthFromSession || donorIdFromSession ) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
      setDonorData(donorIdFromSession);
    }

     OverallProject(params);
     villagesData(params);
     fetchData(params);
     impactData(params);
     unitGraphValues(params)
  },[])

  const handleSubmit = async (e, startDate,endDate, DonorData) => {
    e.preventDefault();

    const startMonth = moment(startDate).format("yyyy-MM-DD");
    const endMonth = moment(endDate).format("yyyy-MM-DD");
    const donorId = DonorData;
    
    const queryParams = `donor_id=${donorId}&start_date=${startMonth}&end_date=${endMonth}`
    sessionStorage.setItem("summary_filter", queryParams);
    sessionStorage.setItem("sumryStartMonth", startMonth);
    sessionStorage.setItem("sumryEndMonth", endMonth);
    sessionStorage.setItem("sumryDonor_id", donorId);

    try {
      await OverallProject(queryParams);
      await villagesData(queryParams);
      await fetchData(queryParams);
      await impactData(queryParams);
      await unitGraphValues(queryParams);

      // All APIs were successfully called and data is set in their respective states.
      console.log("All API calls completed successfully.");
    } catch (error) {
      console.error("Error in one or more API calls:", error);
    }
  };

  async function OverallProject(queryParams) {
    return await SummaryService.projectMatrix(queryParams)
      .then((response) => {
        setOverAllProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function villagesData(queryParams) {
    return await SummaryService.villages(queryParams)
      .then((response) => {
        setVillageData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchData(queryParams) {
    return await SummaryService.monthlyGraph(queryParams)
      .then((response) => {
        setMonthlyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function impactData(queryParams) {
    return await SummaryService.impactValues(queryParams)
      .then((response) => {
        setImpactAnalyasis(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function unitGraphValues(queryParams) {
    return await SummaryService.unitGraph(queryParams)
      .then((response) => {
        setUnitAnalyasis(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen="750"
      >
        <div className="summary_main">
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

                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <Donor donordata={DonorData} setdata={setDonorData} />
                    </div>
                  </div>
                </div>

                <div className="col-md-5 text-end">
                  <butoon type="button" onClick={(e) => handleSubmit(e, startDate, endDate,DonorData)} className="btn admin-btn">
                    Submit
                  </butoon>
                </div>
              </div>
            </div>
          </div>

          {/* overall project metrics */}
          <div className="over_project">
            <h2>Overall Project Metrics</h2>
            <div className="container">
              <div className="project_box_main">
                {overAllProject === undefined ? (
                  <div className="project_box text-center">
                    <img
                      className="no_img"
                      src={noData}
                      alt="no_data"
                      height={100}
                    />
                    <p>Beneficiaries Households Impacted</p>
                  </div>
                ) : (
                  <DataBox
                    className1="project_box"
                    amount={overAllProject?.Beneficiary_Household_Impacted?.[0].toFixed()}
                    name="Beneficiaries Households Impacted"
                  />
                )}

                {overAllProject === undefined ? (
                  <div className="project_box text-center">
                    <img
                      className="no_img"
                      src={noData}
                      alt="no_data"
                      height={100}
                    />
                    <p>Beneficiaries Households Impacted</p>
                  </div>
                ) : (
                  <DataBox
                    className1="project_box"
                    amount={overAllProject?.Total_Lives_Impacted?.[0].toFixed()}
                    name="Total Lives Impacted"
                  />
                )}

                {overAllProject === undefined ? (
                  <div className="project_box text-center">
                    <img
                      className="no_img"
                      src={noData}
                      alt="no_data"
                      height={100}
                    />
                    <p>Beneficiaries Households Impacted</p>
                  </div>
                ) : (
                  <DataBox
                    className1="project_box"
                    amount={overAllProject?.Village_Count?.[0].toFixed()}
                    name="Villages covered"
                  />
                )}

                {overAllProject === undefined ? (
                  <div className="project_box text-center">
                    <img
                      className="no_img"
                      src={noData}
                      alt="no_data"
                      height={100}
                    />
                    <p>Beneficiaries Households Impacted</p>
                  </div>
                ) : (
                  <DataBox
                    className1="project_box"
                    className2="project_box_icon"
                    amount={overAllProject?.Proportion_of_commissioned_Biostove?.[0].toFixed()}
                    name="Proportion of Commissioned Biostove"
                    favourite="favourite"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="summary_acivity">
            <h2>Block Wise Activity</h2>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="activity_chart">
                    { villageData?.length === 0 || villageData === undefined ? (
                      <div className="project_box text-center">
                        <img
                          className="no_img"
                          src={noData}
                          alt="no_data"
                          height={100}
                        />
                        <p>Block Wise Distribution</p>
                      </div>
                    ) : (
                      <>
                        <ComposedChart
                          width={800}
                          height={350}
                          data={villageData}
                          margin={{
                            top: 0,
                            right: 20,
                            bottom: 0,
                            left: 20,
                          }}
                        >
                          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis dataKey="a_village_name" />
                          <YAxis type="number" domain={[0, 100]} />
                          <Tooltip />
                          <Bar
                            dataKey="biostove_distributed"
                            barSize={100}
                            fill="#38b6ff"
                          />
                        </ComposedChart>
                        <p>Block Wise Distribution</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="activity_map h-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14687.267328509402!2d72.50919378874067!3d23.03049666426422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b353bc60d91%3A0xd5e48ea22ff8d924!2sSatellite%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687768788421!5m2!1sen!2sin"
                      className="w-100 border-0"
                      height="500"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <p>Location Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Bisostove Distribution */}
          <div className="monthly_distribute">
            <h2>Monthly Bisostove Distribution</h2>
            { monthlyData?.length === 0 || monthlyData === undefined ? (
              <div className="text-center">
                <img
                  className="no_img"
                  src={noData}
                  alt="no_data"
                  height={200}
                />
              </div>
            ) : (
              <div className="container">
                <LinesChart
                  width={900}
                  height={300}
                  data={monthlyData}
                  XAxis="month"
                  domain={[0, 700]}
                  dataKey="quantity"
                  stroke="#82ca9d"
                />
                <p>Monthly Bisostove Distribution Chart</p>
              </div>
            )}
          </div>

          <div className="over_project">
            <h2>Absolute Impact Analyasis</h2>
            {impactAnalyasis?.length === 0 || impactAnalyasis === undefined ? (
              <div className="text-center">
                <img
                  className="no_img"
                  src={noData}
                  alt="no_data"
                  height={200}
                />
              </div>
            ) : (
              <div className="container">
                <div className="impact_box">
                  {impactAnalyasis.map((data) => {
                    return (
                      <>
                        <DataBox
                          className1="project_box"
                          amount={data.reduction_in_consumption}
                          name="Reduction in Fuel Consumption"
                          kg="kg"
                        />
                        <DataBox
                          className1="project_box"
                          amount={data.reduction_in_procurement}
                          name="Reduction in Cost of Procurment"
                          rupee="rupee"
                        />
                        <DataBox
                          className1="project_box"
                          amount={data.reduction_in_time_obtaining_wood}
                          name="Reduction in Time for Obtaining wood"
                          hrs="hrs"
                        />
                        <DataBox
                          className1="project_box"
                          amount={data.reduction_in_cooking_time}
                          name="Reduction in Cooking Time"
                          hrs="hrs"
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="over_project">
            <h2>Unit Impact Analysis</h2>
            { unitAnalyasis?.length === 0 ||  unitAnalyasis === undefined ? (
              <div className="text-center">
                <img
                  className="no_img"
                  src={noData}
                  alt="no_data"
                  height={200}
                />
              </div>
            ) : (
              <div className="unit_analysis">
                <div>
                  <BarChart
                    data={unitAnalyasis}
                    domain={[0, 6]}
                    xAxis="site"
                    dataKey="avg_cost_procuring_wood"
                    fill="#38b6ff"
                  />

                  <p>Average Fuel Consumption(Kg/day)</p>
                </div>
                <div>
                  <BarChart
                    data={unitAnalyasis}
                    domain={[0, 6]}
                    xAxis="site"
                    dataKey="avg_fuel_consumption"
                    fill="#5271ff"
                  />
                  <p>Average Cost of Procuring Wood (INR/Month/HouseHold)</p>
                </div>
                <div>
                  <BarChart
                    data={unitAnalyasis}
                    domain={[0, 6]}
                    xAxis="site"
                    dataKey={"avg_time_procuring_wood"}
                    fill="#004aad"
                  />
                  <p>Average Time Procuring Wood(Hrs/Day)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;

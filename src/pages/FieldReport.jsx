import React, { useEffect, useState } from "react";
import DataBox from "../components/filters/DataBox";
import Donor from "../components/filters/Donor";
import Site from "../components/filters/Site";
import FieldService from "../services/FieldReport";
import moment from "moment";
import LinesChart from "../components/graphs/LineChart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import noData from "../assets/images/no_data.jpeg";
import StartMonth from "../components/filters/StartMonth";
import EndMonth from "../components/filters/EndMonth";

const FieldReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [DonorData, setDonorData] = useState("");
  const [siteData, setSiteData] = useState("");
  const [fieldActivityReport, setFieldActivityReport] = useState([]);
  const [surveyGraphActivity, setSurveyGraphActivity] = useState([]);
  const [sitewiseActivity, setSitewiseActivity] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState([]);
  const [OriginalBeneficiaryData, setOriginalBeneficiaryData] = useState([]);
  const [searchfilter, setSearchFilter] = useState("initial");
  const [selectedItem, setSelectedItem] = useState(null);
  const [eps, setEPS] = useState(false);
  const [dist, setDist] = useState(false);
  const [pds, setPDS] = useState(false);

  useEffect(()=>{
    const FieldParams = sessionStorage.getItem("field_filter")

    const startMonthFromSession = sessionStorage.getItem("fieldStartMonth");
    const endMonthFromSession = sessionStorage.getItem("fieldEndMonth");
    const donorIdFromSession = sessionStorage.getItem("fieldDonor_id")
    const siteFromSession = sessionStorage.getItem("fieldSite")

    if (startMonthFromSession || endMonthFromSession || donorIdFromSession || siteFromSession ) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
      setDonorData(donorIdFromSession);
      setSiteData(siteFromSession);
    }

    fieldActivity(FieldParams);
    survey_graphs(FieldParams);
    site_wise_graph(FieldParams);
    beneficiary_data(FieldParams);

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startMonth = moment(startDate).format("yyyy-MM-DD");
    const endMonth = moment(endDate).format("yyyy-MM-DD");
    const queryParams = `site_id=${siteData}&donor_id=${DonorData}&start_date=${startMonth}&end_date=${endMonth}`;

    sessionStorage.setItem("field_filter", queryParams);
    sessionStorage.setItem("fieldStartMonth", startMonth);
    sessionStorage.setItem("fieldEndMonth", endMonth);
    sessionStorage.setItem("fieldSite", siteData);
    sessionStorage.setItem("fieldDonor_id", DonorData);

    try {
      await fieldActivity(queryParams);
      await survey_graphs(queryParams);
      await site_wise_graph(queryParams);
      await beneficiary_data(queryParams);

      // All APIs were successfully called and data is set in their respective states.
      console.log("All API calls completed successfully.");
    } catch (error) {
      console.error("Error in one or more API calls:", error);
    }
  };

  const fieldActivity = async (queryParams) => {
    return await FieldService.field_report_activity(queryParams)
      .then((response) => {
        setFieldActivityReport(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const survey_graphs = async (queryParams) => {
    return await FieldService.survey_graph(queryParams)
      .then((response) => {
        setSurveyGraphActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const site_wise_graph = async (queryParams) => {
    return await FieldService.site_wise(queryParams)
      .then((response) => {
        setSitewiseActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const beneficiary_data = async (queryParams) => {
    return await FieldService.question_response(queryParams)
      .then((response) => {
        setBeneficiaryData(response.data);
        setOriginalBeneficiaryData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchfilter === "initial") return;
    if (searchfilter === "") {
      setBeneficiaryData(OriginalBeneficiaryData);
      return;
    }
    setBeneficiaryData(
      OriginalBeneficiaryData.filter((item) =>
        item.b_name.toLowerCase().includes(searchfilter.toLowerCase())
      )
    );
  }, [searchfilter, OriginalBeneficiaryData]);

  const handleEPS = () => {
    setEPS(!eps);
    setPDS(false);
    setDist(false);
  };

  const handleDist = () => {
    setEPS(false);
    setPDS(false);
    setDist(!dist);
  };

  const handlePDS = () => {
    setEPS(false);
    setPDS(!pds);
    setDist(false);
  };

  const filteredIntenDetails =
    beneficiaryData !== undefined &&
    beneficiaryData.filter((data) => {
      if (eps && data?.form_list_dict.EPS === 1) {
        return true;
      }
      if (dist && data?.form_list_dict.DF === 1) {
        return true;
      }
      if (pds && data?.form_list_dict.PDS === 1) {
        return true;
      }
      return false;
    });

  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen="750"
    >
      <div className="field_main">
        <div className="fillter_part">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-2">
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
                    <Site siteData={siteData} setdata={setSiteData} />
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
              <div className="col-md-2 text-end">
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

        <div className="field_activity">
          <h2>Activity</h2>

          {fieldActivityReport === undefined ? (
            <div className="text-center">
              <img src={noData} alt="no_data" height={180} />
            </div>
          ) : (
            fieldActivityReport.map((data, id) => {
              return (
                <>
                  <div className="field_activity_inr">
                    <DataBox
                      className1="field_activity_box"
                      amount={data.biostove_ditributed}
                      name="Biostove Distributed"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.village_covered}
                      name="Villages Covered"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.eps_collected}
                      name="EPS Collected"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.pds_collected}
                      name="PDS Collected"
                    />
                    <DataBox
                      className1="field_activity_box"
                      rupee="rupee"
                      amount={data.amount_collected}
                      name="Amount Collected"
                    />
                    <DataBox
                      className1="field_activity_box"
                      rupee="rupee"
                      amount={data.amount_due}
                      name="Amount Due"
                    />
                  </div>
                  <div className="field_activity_inr_bottom">
                    <DataBox
                      className1="field_activity_box"
                      percen="percen"
                      amount={data.pds_to_ben}
                      name="PDS to Beneficiary"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.eps_to_ben}
                      percen="percen"
                      name="EPS to Beneficiary"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.dist_to_ben}
                      percen="percen"
                      name="Dist to Beneficiary"
                    />
                    <DataBox
                      className1="field_activity_box"
                      amount={data.otp_verified}
                      name="OTP verified"
                    />
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>

      <div className="survey_data">
        <h2>Survey Collection</h2>
        {surveyGraphActivity?.length === 0 ? (
          <div className="text-center">
            <img src={noData} alt="no_data" height={180} />
          </div>
        ) : (
          <div className="survey_graph_data">
            <div>
              <LinesChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                XAxis="constantDate"
                domain={[0, 30]}
                dataKey="eps_collected"
                stroke="#82ca9d"
              />
              <p>EPS Collected</p>
            </div>
            <div>
              <LinesChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                XAxis="constantDate"
                domain={[0, 30]}
                dataKey="distribution_forms_collected"
                stroke="#82ca9d"
              />
              <p>Distribution Forms Filled</p>
            </div>
            <div>
              <LinesChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                XAxis="constantDate"
                domain={[0, 30]}
                dataKey="pds_collected"
                stroke="#82ca9d"
              />
              <p>POS Collected</p>
            </div>
          </div>
        )}
      </div>

      <div className="sitewise_activity">
        <h2>Village Wise Activity</h2>
        {sitewiseActivity?.length === 0 ? (
          <div className="text-center">
            <img src={noData} alt="no_data" height={180} />
          </div>
        ) : (
          <div className="siteWise_graph">
            <BarChart
              width={900}
              height={300}
              data={sitewiseActivity}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="a_village_name" />
              <YAxis type="number" domain={[0, 50]} />
              <Tooltip />
              <Bar dataKey="eps_collected" barSize={80} fill="#38b6ff" />
              <Bar dataKey="pds_collected" barSize={80} fill="#5271ff" />
              <Bar
                dataKey="distribution_forms_collected"
                barSize={80}
                fill="#004aad"
              />
            </BarChart>
            <p>Village Wise Field Activity</p>
          </div>
        )}
      </div>

      <div className="data_table">
        <div className="data_table_header">
          <h2>Beneficiary Data</h2>

          <div className="table_filter">
            <h3>Filter :</h3>
            <button
              className={
                eps === true
                  ? "badge rounded-pill active"
                  : "badge rounded-pill"
              }
              onClick={handleEPS}
            >
              EPS
            </button>
            <button
              className={
                dist === true
                  ? "badge rounded-pill active"
                  : "badge rounded-pill"
              }
              onClick={handleDist}
            >
              Dist
            </button>
            <button
              className={
                pds === true
                  ? "badge rounded-pill active"
                  : "badge rounded-pill"
              }
              onClick={handlePDS}
            >
              PDS
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="data_search">
              <input
                onKeyUp={(e) => setSearchFilter(e.target.value)}
                className="form-control"
                placeholder="Search Name Here"
                type="text"
              />
            </div>
            <span className="csv_bt">
              {beneficiaryData !== undefined && (
                <CSVLink
                  data={beneficiaryData}
                  filename={"Field-Beneficiary-Data"}
                >
                  <FaDownload className="icon" />
                </CSVLink>
              )}
            </span>
          </div>
        </div>
        <div className="field_scroll">
          <table className="table m-0">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Village</th>
                <th>Block</th>
                <th>Wadi</th>
                <th>Date of Distribution</th>
                <th>Status</th>
              </tr>
            </thead>
            {beneficiaryData?.length === 0 || beneficiaryData === undefined ? (
              <tbody>
                <tr>
                  <td colspan="8" class="text-center">
                    <span className="text-danger">
                      <strong>No Data Available</strong>
                    </span>
                  </td>
                </tr>
              </tbody>
            ) : (
              <>
                {selectedItem ? (
                  <tbody>
                    <tr className="text-center">
                      <td>{selectedItem.b_benefeciary_id}</td>
                      <td>{selectedItem.b_name}</td>
                      <td>{selectedItem.b_phone}</td>
                      <td>{selectedItem.a_village_name}</td>
                      <td>{selectedItem.a_block_name}</td>
                      <td>{selectedItem.a_hamlet_name}</td>
                      <td>{selectedItem.distributionDate}</td>
                      <td>
                        <GoDotFill
                          color={
                            selectedItem.form_list_dict.EPS === 1
                              ? "#52eb85"
                              : "#d8e3dc"
                          }
                          size={20}
                        />
                        <GoDotFill
                          color={
                            selectedItem.form_list_dict.DF === 1
                              ? "#52eb85"
                              : "#d8e3dc"
                          }
                          size={20}
                        />
                        <GoDotFill
                          color={
                            selectedItem.form_list_dict.PDS === 1
                              ? "#52eb85"
                              : "#d8e3dc"
                          }
                          size={20}
                        />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <>
                    {eps === true || dist === true || pds === true ? (
                      <>
                        {filteredIntenDetails.length === 0 ? (
                          <tbody>
                            <tr>
                              <td colspan="8" class="text-center">
                                <span className="text-danger">
                                  <strong>No Data Available</strong>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {filteredIntenDetails.map((data, id) => (
                              <tr className="text-center">
                                <td>{data.b_benefeciary_id}</td>
                                <td>{data.b_name}</td>
                                <td>{data.b_phone}</td>
                                <td>{data.a_village_name}</td>
                                <td>{data.a_block_name}</td>
                                <td>{data.a_hamlet_name}</td>
                                <td>{data.distributionDate}</td>
                                <td>
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.EPS === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.DF === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.PDS === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </>
                    ) : (
                      <tbody>
                        {beneficiaryData !== undefined &&
                          beneficiaryData.map((data, id) => {
                            data.b_benefeciary_id = id + 1;
                            return (
                              <tr className="text-center" key={id}>
                                <td>{data.b_benefeciary_id}</td>
                                <td>{data.b_name}</td>
                                <td>{data.b_phone}</td>
                                <td>{data.a_village_name}</td>
                                <td>{data.a_block_name}</td>
                                <td>{data.a_hamlet_name}</td>
                                <td>{data.distributionDate}</td>
                                <td>
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.EPS === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.DF === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                  <GoDotFill
                                    color={
                                      data.form_list_dict.PDS === 1
                                        ? "#52eb85"
                                        : "#d8e3dc"
                                    }
                                    size={20}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    )}
                  </>
                )}
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default FieldReport;

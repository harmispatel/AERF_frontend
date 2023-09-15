import React, { useEffect, useRef, useState } from "react";
import StartMonth from "../components/filters/StartMonth";
import EndMonth from "../components/filters/EndMonth";
import Site from "../components/filters/Site";
import Survey from "../components/filters/Survey";
import { CSVLink } from "react-csv";
import noData from "../assets/images/no_data.jpeg";
import DataBox from "../components/filters/DataBox";
import FormService from "../services/FormReport";
import moment from "moment";
import Select from "react-select";
import { FaCalendarDays, FaDownload, FaPhone, FaUser } from "react-icons/fa6";

const FormReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [siteData, setSiteData] = useState("");
  const [surveyData, setSurveyData] = useState("");
  const [dataDownload, setDataDownload] = useState([]);
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [beneficiarySearch, setBeneficiarySearch] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    ProfileDetails();
    BeneficiarySearchData();
  }, [selectedOption]);

  useEffect(()=>{
    const FormParams = sessionStorage.getItem("form_filter")
    const startMonthFromSession = sessionStorage.getItem("formStartMonth");
    const endMonthFromSession = sessionStorage.getItem("formEndMonth");
    const siteFromSession = sessionStorage.getItem("formSite")
    const surveyFromSession = sessionStorage.getItem("formSurvey")
    const selectedOption = sessionStorage.getItem("selecetdOption")

    if (startMonthFromSession || endMonthFromSession || surveyFromSession || siteFromSession ) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
      setSurveyData(surveyFromSession);
      setSiteData(siteFromSession);
      setSelectedOption(selectedOption)
    }

    SurveyData(FormParams);
    ActionDetails(FormParams);
    Beneficiary(FormParams);
    All_download(FormParams)

  },[])

  const startMonth = moment(startDate).format("yyyy-MM-DD");
  const endMonth = moment(endDate).format("yyyy-MM-DD");
  const queryParams = `site_id=${siteData}&survey_id=${surveyData}&start_date=${startMonth}&end_date=${endMonth}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = `site_id=${siteData}&survey_id=${surveyData}&start_date=${startMonth}&end_date=${endMonth}`;

    sessionStorage.setItem("form_filter", queryParams);
    sessionStorage.setItem("formStartMonth", startMonth);
    sessionStorage.setItem("formEndMonth", endMonth);
    sessionStorage.setItem("formSite", siteData);
    sessionStorage.setItem("formSurvey", surveyData);

    try {
      await SurveyData(queryParams);
      await ActionDetails(queryParams);
      await Beneficiary(queryParams);
      await All_download(queryParams)

      // All APIs were successfully called and data is set in their respective states.
      console.log("All API calls completed successfully.");
      setSelectedOption("");
    } catch (error) {
      console.error("Error in one or more API calls:", error);
    }
  };

  const SurveyData = async (queryParams) => {
    return await FormService.survey_info(queryParams)
      .then((response) => {
        setSurveyInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ActionDetails = async (queryParams) => {
    return await FormService.active_question(queryParams)
      .then((response) => {
        setQuestionDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Beneficiary = async (queryParams) => {
    return await FormService.Beneficiary_search(queryParams)
      .then((response) => {
        setBeneficiarySearch(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const All_download = async (queryParams) => {
    return await FormService.Bulk_data(queryParams)
      .then((response) => {
        setDataDownload(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ProfileDetails = async () => {
    const selectedID = selectedOption?.value;
    const profileQuery = `beneficiary_id=${selectedID}&survey_id=${surveyData}`;
    return await FormService.profile_info(profileQuery)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    sessionStorage.setItem("selecetdOption", selectedOption?.value);

  };

  const handleInputChange = (inputValue) => {
    // Filter options based on the user input
    const filteredOptions = beneficiarySearch.filter((item) => {
      const name = item.b_name || "";
      return name.toLowerCase().includes(inputValue?.toLowerCase() ?? "");
    });

    setOptions(
      filteredOptions.map((item) => ({
        value: item.b_benefeciary_id,
        label: item.b_name,
      }))
    );
  };

  const BeneficiarySearchData = async () => {
    const selectedID = selectedOption?.value;
    const queryParams = `survey_id=${surveyData}&beneficiary_id=${selectedID}`;
    return await FormService.Beneficiary_Data(queryParams)
      .then((response) => {
        setBeneficiaryData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="content-wrapper iframe-mode"
      data-widget="iframe"
      data-loading-screen="750"
    >
      <div className="formreport_main">
        <div className="fillter_part">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-1">
                <div className="fillter_box">
                  <h3>Fillter</h3>
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
                    <Survey surveyData={surveyData} setdata={setSurveyData} />
                  </div>
                </div>
              </div>
              <div className="col-md-1 text-end">
                <butoon
                  type="button"
                  onClick={handleSubmit}
                  className="btn admin-btn"
                >
                  Submit
                </butoon>
              </div>
              <div className="col-md-2">
                <div className="download_btn text-end">
                  <button className="btn">
                    <CSVLink
                      className="bulk_btn"
                      filename={"Form-Bulk-Data"}
                      data={dataDownload}
                    >
                      Bulk <span>[<FaDownload />]</span>
                    </CSVLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="village_detail_main">
          <div className="row">
            <div className="col-md-5">
              <div className="village_detail_inr h-100">
                <h2>Survey Info</h2>
                {surveyInfo?.length === 0 || surveyInfo === undefined ? (
                  <div className="text-center">
                    <img src={noData} alt="no_data" height={180} />
                  </div>
                ) : (
                  surveyInfo.map((data, id) => {
                    return (
                      <div className="village_detail_box_main" key={id}>
                        <DataBox
                          className1="village_detail_box"
                          amount={data.survey}
                          name="Survey Count"
                        />
                        <DataBox
                          className1="village_detail_box"
                          amount={data.survey_to_beneficiary}
                          name="Survey to Beneficiary %"
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="data_table">
                <div className="data_table_header">
                  <h2>Form Active Question Details</h2>
                  <span className="csv_bt">
                    <CSVLink data={questionDetails} filename={"Form-Question"}>
                      <FaDownload className="icon" />
                    </CSVLink>
                  </span>
                </div>
                <div className="scroll_table table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr className="text-center">
                        <th>Q.ID</th>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    {questionDetails.length === 0 ||
                    questionDetails === undefined ? (
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
                        {questionDetails.map((data, id) => {
                          return (
                            <tr className="text-center" key={id}>
                              <td>{data.fques_id}</td>
                              <td>{data.fques_question}</td>
                              <td>{data.options}</td>
                              <td>
                                {moment(data.added_date).format("yyyy-MM-DD")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data_table qna_data_table filter_data_table">
          <h2>Question Responses</h2>
          <div className="data_table_header">
            <div className="data_search">
              <Select
                ref={searchRef}
                value={selectedOption}
                onChange={handleSelectChange}
                onInputChange={handleInputChange}
                placeholder="Select Beneficiary"
                options={options}
                isSearchable
                isClearable
                isOptionSelected={true}
              />
            </div>
            {selectedOption && (
              <div className="user_info">
                {profileData.map((data, id) => {
                  return (
                    <ul key={id}>
                      <li>
                        <FaUser className="icon" />
                        <label>{data.name}</label>
                      </li>
                      <li>
                        <FaPhone className="icon" />
                        <label>{data.phone}</label>
                      </li>
                      <li>
                        <FaCalendarDays className="icon" />
                        <label>{data.date}</label>
                      </li>
                    </ul>
                  );
                })}
              </div>
            )}
            <span className="csv_bt">
              <CSVLink
                data={beneficiaryData}
                filename={"Form-Question-response"}
              >
                <FaDownload className="icon" />
              </CSVLink>
            </span>
          </div>
          <div className="scroll_table table-responsive">
            <table className="table m-0">
              <thead>
                <tr className="text-center">
                  <th>Q.ID</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Date</th>
                </tr>
              </thead>
              {selectedOption ? (
                <tbody>
                  {beneficiaryData.map((data) => {
                    const date = moment(data.added_date).format("yyyy-MM-DD");
                    return (
                      <tr className="text-center">
                        <td>{data.fques_id}</td>
                        <td>{data.fques_question}</td>
                        <td>{data.fans_ans}</td>
                        <td>{date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colspan="6" class="text-center">
                      <span className="text-danger">
                        <strong>No Data Available</strong>
                      </span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormReport;

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import OverallService from "../../services/Overall";
import StartMonth from "../../components/filters/StartMonth";
import Site from "../../components/filters/Site";
import moment from "moment";
import DataBox from "../../components/filters/DataBox";
import noData from "../../assets/images/no_data.jpeg";
import EndMonth from "../../components/filters/EndMonth";

const Overall = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [siteData, setSiteData] = useState("");
  const [overallInventory, setOverallInventory] = useState([]);
  const [intenDetails, setIntenDetails] = useState([]);
  const [distributionGraph, setDistributationGraph] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {

    const FormParams = sessionStorage.getItem("overall_filter")
    const startMonthFromSession = sessionStorage.getItem("overallStartMonth");
    const endMonthFromSession = sessionStorage.getItem("overallEndMonth");
    const siteFromSession = sessionStorage.getItem("overallSite")
    
    if (startMonthFromSession || endMonthFromSession || siteFromSession ) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
      setSiteData(siteFromSession);
    }

    Overall_inventory(FormParams);
    Intent_data(FormParams);
    Distribution(FormParams);

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startMonth = moment(startDate).format("yyyy-MM-DD");
    const endMonth = moment(endDate).format("yyyy-MM-DD");
    const queryParams = `site_id=${siteData}&start_date=${startMonth}&end_date=${endMonth}`;

    sessionStorage.setItem("overall_filter", queryParams);
    sessionStorage.setItem("overallStartMonth", startMonth);
    sessionStorage.setItem("overallEndMonth", endMonth);
    sessionStorage.setItem("overallSite", siteData);

    try {
      await Overall_inventory(queryParams);
      await Intent_data(queryParams);
      await Distribution(queryParams);

      // All APIs were successfully called and data is set in their respective states.
      console.log("All API calls completed successfully.");
    } catch (error) {
      console.error("Error in one or more API calls:", error);
    }
  };

  const Overall_inventory = async (queryParams) => {
    return await OverallService.inventory_data(queryParams)
      .then((response) => {
        setOverallInventory(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Intent_data = async (queryParams) => {
    return await OverallService.intent_details(queryParams)
      .then((response) => {
        setIntenDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Distribution = async (queryParams) => {
    return await OverallService.distribution(queryParams)
      .then((response) => {
        setDistributationGraph(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelivered = () => {
    setDelivered(!delivered);
    setOrdered(false);
  };

  const handleOrdered = () => {
    setOrdered(!ordered);
    setDelivered(false);
  };

  const filteredIntenDetails = intenDetails !== undefined && intenDetails?.filter((data) => {
    if (delivered && data.status === "Delivered") {
      return true;
    }
    if (ordered && data.status === "Ordered") {
      return true;
    }
    return false;
  });

  return (
    <>
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen="750"
      >
        <div className="overall_main">
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
                      <Site siteData={siteData} setdata={setSiteData} />
                    </div>
                  </div>
                </div>
                <div className="col-md-5 text-end">
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

          <div className="overall_info_main">
            <h2>Overall Inventory</h2>
            {overallInventory.length === 0 ? (
              <div className="text-center">
                <img src={noData} alt="no_data" height={180} />
              </div>
            ) : (
              overallInventory.map((data) => {
                return (
                  <div className="row justify-content-center">
                    <div className="col-md-3">
                      <DataBox
                        className1="overall_info_box"
                        amount={data.Total_Order}
                        name="Total Order"
                      />
                    </div>
                    <div className="col-md-3">
                      <DataBox
                        className1="overall_info_box"
                        amount={data.Current_Pending_Order}
                        name="Current Pending Order"
                      />
                    </div>
                    <div className="col-md-3">
                      <DataBox
                        className1="overall_info_box"
                        amount={data.Current_Closing_Stock}
                        name="Current Closing Stock"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="overall_inventory">
            <div className="row">
              <div className="col-md-6">
                <div className="overall_inventory_graph h-100">
                  <h2>Distribution</h2>
                  {distributionGraph?.length === 0 ||
                  distributionGraph === undefined ? (
                    <div className="text-center">
                      <img src={noData} alt="no_data" height={180} />
                    </div>
                  ) : (
                    <div className="siteWise_graph">
                      <BarChart
                        width={900}
                        height={300}
                        data={distributionGraph}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Donor" />
                        <YAxis type="number" domain={[0, 600]} />
                        <Tooltip />
                        <Bar
                          dataKey="procured_inventory"
                          barSize={80}
                          fill="#004aad"
                        />
                        <Bar
                          dataKey="Target_distribution"
                          barSize={80}
                          fill="#38b6ff"
                        />
                      </BarChart>
                      <p>Donor Wise Distribution</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="data_table h-100">
                  <div className="data_table_header">
                    <h2>Intent Details</h2>
                    <div className="table_filter">
                      <h3>Filter :</h3>
                      <button
                        className={
                          delivered === true
                            ? "badge rounded-pill active"
                            : "badge rounded-pill"
                        }
                        onClick={handleDelivered}
                      >
                        Delivered
                      </button>
                      <button
                        className={
                          ordered === true
                            ? "badge rounded-pill active"
                            : "badge rounded-pill"
                        }
                        onClick={handleOrdered}
                      >
                        Ordered
                      </button>
                    </div>
                  </div>
                  <div className="overall_table">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Requester</th>
                          <th>Site</th>
                          <th>Donor</th>
                          <th>Requested Quantity</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {intenDetails?.length === 0 || intenDetails === undefined ? (
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
                          {delivered === true || ordered === true ? (
                            <tbody>
                              {filteredIntenDetails.map((data, id) => (
                                <tr key={id}>
                                  <td>{id + 1}</td>
                                  <td>{data.Requester}</td>
                                  <td>{data.site}</td>
                                  <td>{data.donor}</td>
                                  <td>{data.requested_quantity}</td>
                                  <td>{data.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          ) : (
                            <tbody>
                              {intenDetails.map((data, id) => {
                                data.id = id + 1;
                                return (
                                  <tr>
                                    <td>{data.id}</td>
                                    <td>{data.Requester}</td>
                                    <td>{data.site}</td>
                                    <td>{data.donor}</td>
                                    <td>{data.requested_quantity}</td>
                                    <td>{data.status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          )}
                        </>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overall;

import React from "react";
import "../index.css";
import { FaAngleDown, FaIndianRupeeSign, FaStar } from "react-icons/fa6";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const Summary = () => {
  const data = [
    {
      name: "Kollewadi",
      uv: 155,
    },
    {
      name: "HardKhale",
      uv: 70,
    },
    {
      name: "Prabhanavalli",
      uv: 60,
    },
    {
      name: "Bhambed",
      uv: 180,
    },
  ];

  const monthlyData = [
    {
      name: "Jan,23",
      uv: 150,
    },
    {
      name: "Feb,23",
      uv: 170,
    },
    {
      name: "Mar,23",
      uv: 90,
    },
    {
      name: "Apr,23",
      uv: 140,
    },
    {
      name: "May,23",
      uv: 100,
    },
    {
      name: "June,23",
      uv: 120,
    },
  ]

  const averageFuelData =[
    {
      name: "Before Using Biostove",
      uv: 6,
    },
    {
      name: "After Using Biostove",
      uv: 2.5,
    }
  ]

  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className="summary_main">
          <div className="fillter_part">
            <div className="container">
              <div className="row align-items-center">
                
                <div className="col-md-2">
                  <div className="fillter_box">
                    <h3>Fillter</h3>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <select className="form-select form-control">
                        <option>Month</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                      <span>
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <select className="form-select form-control">
                        <option>Donor</option>
                        <option>Year</option>
                        <option>Date</option>
                        <option>Week</option>
                      </select>
                      <span>
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* overall project metrics */}
          <div className="over_project">
            <h2>Overall Project Metrics</h2>
            <div className="container">
              <div className="project_box_main">
                <div className="project_box">
                  <h3>100</h3>
                  <p>Beneficiaries Households Impacted</p>
                </div>
                
                <div className="project_box">
                  <h3>400</h3>
                  <p>Total Lives Impacted</p>
                </div>
                
                <div className="project_box">
                  <h3>15</h3>
                  <p>Villages covered</p>
                </div>
                
                <div className="project_box">
                  <h3>40%</h3>
                  <p>Proportion of Commissioned Biostove</p>
                  <FaStar className="project_box_icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="summary_acivity">
            <h2>Village wise Activity</h2>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="activity_chart">
                    <ComposedChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <YAxis type="number" domain={[0, 200]} />
                      <Tooltip />
                      <Bar dataKey="uv" barSize={80} fill="#38b6ff" />
                    </ComposedChart>
                    <p>Village Wise Distribution Activity</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="activity_map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14687.267328509402!2d72.50919378874067!3d23.03049666426422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b353bc60d91%3A0xd5e48ea22ff8d924!2sSatellite%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687768788421!5m2!1sen!2sin"
                      className="w-100 border-0"
                      height="400"
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
            <div className="container">
              <LineChart
                width={900}
                height={300}
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 200]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              <p>Monthly Bisostove Distribution Chart</p>
            </div>
          </div>

          <div className="over_project">
            <h2>Absolute Impact Analyasis</h2>
            <div className="container">
              <div className="impact_box">
                <div className="project_box">
                  <h3>300 kg</h3>
                  <p>Reduction in Fuel Consumption</p>
                </div>
                <div className="project_box">
                  <h3> <FaIndianRupeeSign size={50}/> 1500 </h3>
                  <p>Reduction in Cost of Procurment</p>
                </div>
                <div className="project_box">
                  <h3>150 Hrs</h3>
                  <p>Reduction in Time for Obtaining wood</p>
                </div>
              </div>
            </div>
          </div>

          <div className="over_project">
            <h2>Unit Impact Analysis</h2>
            <div className="unit_analysis">
              <div>
                <ComposedChart
                  width={500}
                  height={300}
                  data={averageFuelData}
                  margin={{
                    top: 0,
                    right: 20,
                    bottom: 0,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" domain={[0, 6]} />
                  <Tooltip />
                  <Bar dataKey="uv" barSize={100} fill="#38b6ff" />
                </ComposedChart>
                <p>Average Fuel Consumption(Kg/day)</p>
              </div>
              <div>
                <ComposedChart
                  width={500}
                  height={300}
                  data={averageFuelData}
                  margin={{
                    top: 0,
                    right: 20,
                    bottom: 0,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" domain={[0, 6]} />
                  <Tooltip />
                  <Bar dataKey="uv" barSize={100} fill="#5271ff" />
                </ComposedChart>
                <p>Average Cost of Procuring Wood(INR/Month/Household)</p>
              </div>
              <div>
                <ComposedChart
                  width={500}
                  height={300}
                  data={averageFuelData}
                  margin={{
                    top: 0,
                    right: 20,
                    bottom: 0,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" domain={[0, 6]} />
                  <Tooltip />
                  <Bar dataKey="uv" barSize={100} fill="#004aad" />
                </ComposedChart>
                <p>Average Time Procuring Wood(Hrs/Day)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;

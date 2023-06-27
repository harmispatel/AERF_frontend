import React from 'react'
import { FaAngleDown, FaIndianRupeeSign, FaMagnifyingGlass, FaDownload } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const FieldReport = () => {
  const surveyData = [
    {
      name: "Jan,23",
      uv: 15,
    },
    {
      name: "Feb,23",
      uv: 20,
    },
    {
      name: "Mar,23",
      uv: 10,
    },
    {
      name: "Apr,23",
      uv: 12,
    },
    {
      name: "May,23",
      uv: 25,
    },
    {
      name: "June,23",
      uv: 30,
    },
  ]

  const sitewisedata = [
    {
      name: 'Lanja',
      uv: 150,
      pv: 50,
      mv: 20,
      amt: 2400,
    },
    {
      name: 'Rajanwadi',
      uv: 70,
      pv: 20,
      mv: 40,
      amt: 2210,
    },
    {
      name: 'Pen',
      uv: 70,
      pv: 10,
      mv: 30,
      amt: 2290,
    },
    {
      name: 'Alibaug',
      uv: 200,
      pv: 70,
      mv: 30,
      amt: 2290,
    }
  ];

  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='field_main'>
          <div className='fillter_part'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-2'>
                  <div className='fillter_box'>
                    <h3>Fillter</h3>
                  </div>
                </div>
                <div className='col-md-2'>
                  <div className='fillter_box'>
                    <div className='form-group'>
                      <select className='form-select form-control'>
                        <option>Month</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
                      <span><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
                <div className='col-md-2'>
                  <div className='fillter_box'>
                    <div className='form-group'>
                      <select className='form-select form-control'>
                        <option>Site</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
                      <span><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
                <div className='col-md-2'>
                  <div className='fillter_box'>
                    <div className='form-group'>
                      <select className='form-select form-control'>
                        <option>Donor</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
                      <span><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='field_activity'>
            <h2>Activity</h2>
            <div className='field_activity_inr'>
              <div className='field_activity_box'>
                <h3>200/250</h3>
                <p>Biostove Distributed</p>
              </div>
              <div className='field_activity_box'>
                <h3>8</h3>
                <p>Villages Covered</p>
              </div>
              <div className='field_activity_box'>
                <h3>52/60</h3>
                <p>EPS Collected</p>
              </div>
              <div className='field_activity_box'>
                <h3>43/45</h3>
                <p>PDS Collected</p>
              </div>
              <div className='field_activity_box'>
                <h3>10k</h3>
                <p>Amount Collected</p>
                <FaIndianRupeeSign className='icon' />
              </div>
              <div className='field_activity_box'>
                <h3>500</h3>
                <p>Amount Due</p>
                <FaIndianRupeeSign className='icon' />
              </div>
            </div>
            <div className='field_activity_inr_bottom'>
              <div className='field_activity_box'>
                <h3>25%</h3>
                <p>PDS to Beneficiary</p>
              </div>
              <div className='field_activity_box'>
                <h3>30%</h3>
                <p>EPS to Beneficiary</p>
              </div>
              <div className='field_activity_box'>
                <h3>50%</h3>
                <p>Dist to Beneficiary</p>
              </div>
              <div className='field_activity_box'>
                <h3>300</h3>
                <p>OTP verified</p>
              </div>
            </div>
          </div>
        </div>

        <div className='survey_data'>
          <h2>Survey Collection</h2>
          <div className='survey_graph_data'>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              <p>EPS Collected</p>
            </div>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              <p>Distribution Forms Filled</p>
            </div>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              <p>POS Collected</p>
            </div>
          </div>
        </div>

        <div className='sitewise_activity'>
          <h2>Site Wise Activity</h2>
          <div className='siteWise_graph'>
            <BarChart
              width={900}
              height={300}
              data={sitewisedata}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 200]} />
              <Tooltip />
              <Bar dataKey="pv" barSize={80} fill="#38b6ff" />
              <Bar dataKey="uv" barSize={80} fill="#5271ff" />
              <Bar dataKey="mv" barSize={80} fill="#004aad" />
            </BarChart>
            <p>Sitewise Field Activity</p>
          </div>
        </div>

        <div className='data_table'>
          <div className='data_table_header'>
            <h2>Question Responses</h2>
            <div className='d-flex align-items-center'>
              <div className='data_search'>
                <input className='form-control' placeholder='Search Name / Contact' type='text' />
                <FaMagnifyingGlass className='icon' />
              </div>
              <span className='ml-3'><FaDownload className='icon' /></span>
            </div>
          </div>
          <table className='table m-0'>
            <thead>
              <tr>
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
            <tbody>
              <tr>
                <td>1</td>
                <td>Beneficiary</td>
                <td>98xxx xxxx</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className='status_part'>
                    <ul>
                      <li><label className='active'></label></li>
                      <li><label className='active'></label></li>
                      <li><label className='active'></label></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Beneficiary</td>
                <td>98xxx xxxx</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className='status_part'>
                    <ul>
                      <li><label className='active'></label></li>
                      <li><label className='inactive'></label></li>
                      <li><label className='inactive'></label></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Beneficiary</td>
                <td>98xxx xxxx</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className='status_part'>
                    <ul>
                      <li><label className='active'></label></li>
                      <li><label className='inactive'></label></li>
                      <li><label className='inactive'></label></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Beneficiary</td>
                <td>98xxx xxxx</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className='status_part'>
                    <ul>
                      <li><label className='inactive'></label></li>
                      <li><label className='active'></label></li>
                      <li><label className='inactive'></label></li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FieldReport
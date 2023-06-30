import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaIndianRupeeSign, FaMagnifyingGlass, FaDownload } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { field_report_activity, question_response, site_wise, survey_graph } from '../services/FieldReport';
import DatePicker from "react-datepicker";
import { CSVLink } from 'react-csv';

const FieldReport = () => {

  const [startDate, setStartDate] = useState('');
  const [fieldActivityReport,setFieldActivityReport ] = useState([])
  const [surveyGraphActivity,setSurveyGraphActivity ] = useState([])
  const [sitewiseActivity,setSitewiseActivity ] = useState([])
  const [beneficiaryData,setBeneficiaryData ] = useState([])

  useEffect(()=>{
    fieldActivity()
    survey_graphs()
    site_wise_graph()
    beneficiary_data()
  },[])

  const month = 5;
  const site_id = 1
  const donorId = 1;

  const queryParams = `month=2023-02-01&site_id=${site_id}&donor_id=${donorId}`

  const fieldActivity = async () =>{
    return await field_report_activity(queryParams).then(response =>{
      setFieldActivityReport(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const survey_graphs = async () =>{
    return await survey_graph(queryParams).then(response =>{
      setSurveyGraphActivity(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const site_wise_graph = async () =>{
    return await site_wise(queryParams).then(response =>{
      setSitewiseActivity(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const beneficiary_data = async () =>{
    return await question_response(queryParams).then(response =>{
      setBeneficiaryData(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

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
                      <DatePicker
                        className="form-select form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MMMM yyyy"
                        placeholderText="Select a year"
                        showMonthYearPicker
                      />
                      <span className="icon-box"><FaAngleDown className='icon' /></span>
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
                      <span className="icon-box"><FaAngleDown className='icon' /></span>
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
                      <span className="icon-box"><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            fieldActivityReport.map((data,id)=>{
              return(
                <div className='field_activity' key={id}>
                  <h2>Activity</h2>
                  <div className='field_activity_inr'>
                    <div className='field_activity_box'>
                      <h3>{data.biostove_ditributed}</h3>
                      <p>Biostove Distributed</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.village_covered}</h3>
                      <p>Villages Covered</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.eps_collected}</h3>
                      <p>EPS Collected</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.pds_collected}</h3>
                      <p>PDS Collected</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.amount_collected}</h3>
                      <p>Amount Collected</p>
                      <FaIndianRupeeSign className='icon' />
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.amount_due}</h3>
                      <p>Amount Due</p>
                      <FaIndianRupeeSign className='icon' />
                    </div>
                  </div>
                  <div className='field_activity_inr_bottom'>
                    <div className='field_activity_box'>
                      <h3>{data.pds_to_ben}</h3>
                      <p>PDS to Beneficiary</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.eps_to_ben}</h3>
                      <p>EPS to Beneficiary</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.dist_to_ben}</h3>
                      <p>Dist to Beneficiary</p>
                    </div>
                    <div className='field_activity_box'>
                      <h3>{data.otp_verified}</h3>
                      <p>OTP verified</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='survey_data'>
          <h2>Survey Collection</h2>
          <div className='survey_graph_data'>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="eps_collected" stroke="#82ca9d" />
              </LineChart>
              <p>EPS Collected</p>
            </div>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="distribution_forms_collected" stroke="#82ca9d" />
              </LineChart>
              <p>Distribution Forms Filled</p>
            </div>
            <div>
              <LineChart
                width={500}
                height={300}
                data={surveyGraphActivity}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, 30]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#38b6ff"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pds_collected" stroke="#82ca9d" />
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
              data={sitewiseActivity}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="site" />
              <YAxis type="number" domain={[0, 200]} />
              <Tooltip />
              <Bar dataKey="eps_collected" barSize={80} fill="#38b6ff" />
              <Bar dataKey="pds_collected" barSize={80} fill="#5271ff" />
              <Bar dataKey="distribution_forms_collected" barSize={80} fill="#004aad" />
            </BarChart>
            <p>Sitewise Field Activity</p>
          </div>
        </div>

        <div className='data_table'>
          <div className='data_table_header'>
            <h2>Beneficiary Data</h2>
            <div className='d-flex align-items-center'>
              <div className='data_search'>
                <input className='form-control' placeholder='Search Name / Contact' type='text' />
                <FaMagnifyingGlass className='icon' />
              </div>
              <span className='csv_bt'><CSVLink data={beneficiaryData}><FaDownload className='icon' /></CSVLink></span>
            </div>
          </div>
          <table className='table m-0'>
            <thead>
              <tr className='text-center'>
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
              {
                beneficiaryData.map((data,id) =>{
                  return (
                    <tr className='text-center' key={id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.contact}</td>
                      <td>{data.village}</td>
                      <td>{data.block}</td>
                      <td>{data.wadi}</td>
                      <td>{data.distribution_date}</td>
                      <td>{data.status}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FieldReport
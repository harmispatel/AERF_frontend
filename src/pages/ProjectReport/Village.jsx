import React, { useEffect, useState } from 'react'
import "../index.css";
import { FaAngleDown, FaDownload } from "react-icons/fa6";
import { Beneficiary, projectMetric } from '../../services/Village';
import DatePicker from "react-datepicker";
import { CSVLink } from 'react-csv';

const Village = () => {

  const [startDate, setStartDate] = useState('');
  const [metricsData,setMetricsData] =useState([])
  const [beneficiaryData,setBeneficiaryData] = useState([])

  useEffect(() => {
    fetchData()
    beneficiary_Data()
  }, []);

  // const month = 2023-03-01;
  const village_id = 1;
  const wadi_id = 1;

  const queryParams = `village_id=${village_id}&wadi_id=${wadi_id}&month=2023-03-01`

  const fetchData = () => {
    return projectMetric(queryParams)
      .then(response => {
        setMetricsData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  };

  const beneficiary_Data = () => {
    return Beneficiary(queryParams)
      .then(response => {
        setBeneficiaryData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  };

  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='village_main'>
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
                        <option>Village</option>
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
                        <option>Wadi</option>
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
                      <DatePicker
                        className="form-select form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MMMM yyyy"
                        placeholderText="Select a year"
                        showMonthYearPicker
                      />
                      <span className="icon-box">
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='village_detail_main'>
            <div className='row'>
              <div className='col-md-6'>
                {metricsData.map(data=>{
                  return(
                  <div className='village_detail_inr'>
                    <h2>Project Metrics</h2>
                    <div className='village_detail_box_main'>
                      <div className='village_detail_box'>
                        <h3>{data.beneficiary_household_impacted}</h3>
                        <p>Beneficiaries Household Impacted</p>
                      </div>
                      <div className='village_detail_box'>
                        <h3>{data.Total_lives_impacted}</h3>
                        <p>Total Lives Impacted</p>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
              <div className='col-md-6'>
                <div className='location_map'>
                  <h2>Loation Map</h2>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14687.267328509402!2d72.50919378874067!3d23.03049666426422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b353bc60d91%3A0xd5e48ea22ff8d924!2sSatellite%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687768788421!5m2!1sen!2sin" className='w-100 border-0' height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className='data_table'>
            <div className='data_table_header'>
              <h2>Beneficiary Data</h2>
              <span className='csv_bt'><CSVLink data={beneficiaryData}><FaDownload className='icon' /></CSVLink></span>
            </div>
            <table className='table m-0'>
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
              <tbody>
                {beneficiaryData.map(data=>{
                    return(
                      <>
                        <tr>
                          <td>1</td>
                          <td>{data.Name}</td>
                          <td>{data.date}</td>
                          <td>{data.Village}</td>
                          <td>{data.Block}</td>
                          <td>{data.wadi}</td>
                        </tr>
                      </>
                    )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Village
import React from 'react'
import { FaAngleDown, FaDownload , FaMagnifyingGlass , FaUser , FaPhone , FaCalendarDays } from "react-icons/fa6";

const FormReport = () => {
  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='formreport_main'>
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
                        <option>Survey</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
                      <span><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='download_btn text-end'>
                    <button className='btn'>Bulk Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='village_detail_main'>
            <div className='row'>
              <div className='col-md-5'>
                <div className='village_detail_inr h-100'>
                  <h2>Survey Info</h2>
                  <div className='village_detail_box_main'>
                    <div className='village_detail_box'>
                      <h3>250</h3>
                      <p>Survey Count</p>
                    </div>
                    <div className='village_detail_box'>
                      <h3>30%</h3>
                      <p>Survey to Beneficiary %</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-7'>
                <div className='data_table'>
                  <div className='data_table_header'>
                    <h2>Form Active Question Details</h2>
                    <span><FaDownload className='icon' /></span>
                  </div>
                  <table className='table m-0'>
                    <thead>
                      <tr>
                        <th>Q.ID</th>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Date</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Beneficiary</td>
                        <td>98xxx xxxx</td>
                        <td>2023-01-01</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Beneficiary</td>
                        <td>98xxx xxxx</td>
                        <td>2023-01-01</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Beneficiary</td>
                        <td>98xxx xxxx</td>
                        <td>2023-01-01</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Beneficiary</td>
                        <td>98xxx xxxx</td>
                        <td>2023-01-01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='data_table qna_data_table filter_data_table'>
              <h2>Question Responses</h2>
            <div className='data_table_header'>
              <div className='data_search'>
                <input className='form-control' placeholder='Search Name / Contact' type='text' />
                <FaMagnifyingGlass className='icon'/>
              </div>
              <div className='user_info'>
                <ul>
                  <li>
                    <FaUser className='icon'/>
                    <label>Mr. Alpha Romeo</label>
                  </li>
                  <li>
                    <FaPhone className='icon'/>
                    <label>+9198xxx xxxxx</label>
                  </li>
                  <li>
                    <FaCalendarDays className='icon'/>
                    <label>2023-02-21</label>
                  </li>
                </ul>
              </div>
              <span><FaDownload className='icon' /></span>
            </div>
            <table className='table m-0'>
              <thead>
                <tr>
                  <th>Q.ID</th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>No. of members in house</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Biostove: Fuel being used</td>
                  <td>wood</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Biostove: Qty- of fuel required each day (kg.)</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Biostove Usage: Change in time spent cooking food after using biostoves</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormReport
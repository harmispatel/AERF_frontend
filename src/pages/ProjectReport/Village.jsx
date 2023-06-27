import React from 'react'
import "../index.css";
import { FaAngleDown, FaDownload } from "react-icons/fa6";

const Village = () => {
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
                      <span><FaAngleDown className='icon' /></span>
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
                      <span><FaAngleDown className='icon' /></span>
                    </div>
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
              </div>
            </div>
          </div>
          <div className='village_detail_main'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='village_detail_inr'>
                  <h2>Project Metrics</h2>
                  <div className='village_detail_box_main'>
                    <div className='village_detail_box'>
                      <h3>35</h3>
                      <p>Beneficiaries Household Impacted</p>
                    </div>
                    <div className='village_detail_box'>
                      <h3>120</h3>
                      <p>Total Lives Impacted</p>
                    </div>
                  </div>
                </div>
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
              <span><FaDownload className='icon' /></span>
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
                <tr>
                  <td>1</td>
                  <td>Beneficiary</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Beneficiary</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Beneficiary</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Beneficiary</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Village
import React from 'react'
import { FaAngleDown, FaIndianRupeeSign } from "react-icons/fa6";

const FieldReport = () => {
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
      </div>
    </>
  )
}

export default FieldReport
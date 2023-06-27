import React from 'react'
import { FaAngleDown } from "react-icons/fa6";

const Overall = () => {
  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='overall_main'>
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
              </div>
            </div>
          </div>
          <div className='overall_info_main'>
            <h2>Overall Inventory</h2>
            <div className='row justify-content-center'>
              <div className='col-md-3'>
                <div className='overall_info_box'>
                  <h3>1500</h3>
                  <p>Total Order</p>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='overall_info_box'>
                  <h3>300</h3>
                  <p>Current Pending Order</p>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='overall_info_box'>
                  <h3>100</h3>
                  <p>Current Closing Stock</p>
                </div>
              </div>
            </div>
          </div>
          <div className='overall_inventory'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='data_table'>
                  <div className='data_table_header'>
                    <h2>Intent Details</h2>
                  </div>
                  <table className='table m-0'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Requester</th>
                        <th>Donor</th>
                        <th>Requested Quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Subham</td>
                        <td>Donor1</td>
                        <td>500</td>
                        <td>pending</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Pratik</td>
                        <td>Donor2</td>
                        <td>300</td>
                        <td>Allocated</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='overall_inventory_graph h-100'>
                  <h2>Distribution</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overall
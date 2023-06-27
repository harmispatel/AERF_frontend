import React from 'react'
import { FaAngleDown, FaCheck, FaPenToSquare,FaTrash,FaDownload } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Orders = () => {
  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='order_main'>
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
              </div>
            </div>
          </div>
          <div className='order_inventory'>
            <div className='data_table'>
              <div className='data_table_header'>
                <h2>Intent Details</h2>
                <div className='order_data_table_bt d-flex align-items-center'>
                  <button className='btn add_bt'>New Intent</button>
                  <span><FaDownload className='icon' /></span>
                </div>
              </div>
              <table className='table m-0'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Requester</th>
                    <th>Site</th>
                    <th>Donor</th>
                    <th>Requested Quantity</th>
                    <th>Date Expected</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Subham</td>
                    <td>Lanja</td>
                    <td>Donor_1</td>
                    <td>500</td>
                    <td>2023-07-31</td>
                    <td>
                      <label class="tb_check">
                        <input type="checkbox"/>
                        <span class="checkmark"><FaCheck className="check_icon"/></span>
                      </label>
                    </td>
                    <td>
                      <div className='action_bt'>
                        <Link to='#' className='btn btn-success d-flex align-items-center justify-content-center'><FaPenToSquare /></Link>
                        <Link to='#' className='btn btn-danger d-flex align-items-center justify-content-center'><FaTrash /></Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Pratik</td>
                    <td>pen</td>
                    <td>Donor2</td>
                    <td>300</td>
                    <td>2023-07-28</td>
                    <td>
                      <label class="tb_check">
                        <input type="checkbox"/>
                        <span class="checkmark"><FaCheck className="check_icon"/></span>
                      </label>
                    </td>
                    <td>
                    <div className='action_bt'>
                        <Link to='#' className='btn btn-success d-flex align-items-center justify-content-center'><FaPenToSquare /></Link>
                        <Link to='#' className='btn btn-danger d-flex align-items-center justify-content-center'><FaTrash /></Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
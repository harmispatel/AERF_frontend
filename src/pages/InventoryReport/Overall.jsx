import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import DatePicker from "react-datepicker";
import { distribution, intent_details, inventory_data } from '../../services/InventoryProject';

const Overall = () => {

  const [startDate, setStartDate] = useState('');
  const [overallInventory, setOverallInventory] = useState([]);
  const [intenDetails, setIntenDetails] = useState([]);
  const [distributionGraph,setDistributationGraph] = useState([])

  useEffect(()=>{
    Overall_inventory()
    Intent_data()
    Distribution()
  },[])

  const month = 5;
  const site_id = 1

  const queryParams = `month=2023-06-01 &site_id=${site_id}`

  const Overall_inventory = async () =>{
    return await inventory_data(queryParams).then(response=>{
      setOverallInventory(response.data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  const Intent_data = async () =>{
    return await intent_details(queryParams).then(response=>{
      setIntenDetails(response.data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  const Distribution = async () =>{
    return await distribution(queryParams).then(response=>{
      setDistributationGraph(response.data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

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
              </div>
            </div>
          </div>
          <div className='overall_info_main'>
            <h2>Overall Inventory</h2>
            {overallInventory.map(data=>{
                return(
                  <div className='row justify-content-center'>
                    <div className='col-md-3'>
                      <div className='overall_info_box'>
                        <h3>{data.Total_Order}</h3>
                        <p>Total Order</p>
                      </div>
                    </div>
                    <div className='col-md-3'>
                      <div className='overall_info_box'>
                        <h3>{data.Current_Pending_Order}</h3>
                        <p>Current Pending Order</p>
                      </div>
                    </div>
                    <div className='col-md-3'>
                      <div className='overall_info_box'>
                        <h3>{data.Current_Closing_Stock}</h3>
                        <p>Current Closing Stock</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='overall_inventory'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='data_table'>
                  <div className='data_table_header'>
                    <h2>Intent Details</h2>
                    <div className='table_filter'>
                      <h3>Filter :</h3>
                      <button className='badge rounded-pill'>Delivered</button>
                      <button className='badge rounded-pill'>Ordered</button>
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
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        intenDetails.map(data=>{
                          return (
                            <tr>
                              <td>{data.id}</td>
                              <td>{data.Requester}</td>
                              <td>{data.site}</td>
                              <td>{data.Donor}</td>
                              <td>{data.Requested_Quantity}</td>
                              <td>{data.delivered}</td>
                            </tr>
                          )
                        })
                      }
                      {/* <tr>
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
                      <tr>
                        <td>3</td>
                        <td>Pratik</td>
                        <td>Donor2</td>
                        <td>300</td>
                        <td>Allocated</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Pratik</td>
                        <td>Donor2</td>
                        <td>300</td>
                        <td>Allocated</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Pratik</td>
                        <td>Donor2</td>
                        <td>300</td>
                        <td>Allocated</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Pratik</td>
                        <td>Donor2</td>
                        <td>300</td>
                        <td>Allocated</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='overall_inventory_graph h-100'>
                  <h2>Distribution</h2>
                  <div className='siteWise_graph'>
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
                      <Bar dataKey="procured_inventory" barSize={80} fill="#004aad" />
                      <Bar dataKey="Target_distribution" barSize={80} fill="#38b6ff" />
                      {/* <Bar dataKey="mv" barSize={80} fill="#004aad" /> */}
                    </BarChart>
                    <p>Donor Wise Distribution</p>
                  </div>
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
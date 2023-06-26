import React from 'react'
import "./index.css";
import { FaAngleDown , FaStar } from "react-icons/fa6";

const Home = () => {
    return (
        <>
            <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
                <div className='summary_main'>
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
                                                <option>Year</option>
                                                <option>Date</option>
                                                <option>Week</option>
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
                                                <option>Year</option>
                                                <option>Date</option>
                                                <option>Week</option>
                                            </select>
                                            <span><FaAngleDown className='icon' /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='over_project'>
                        <h2>Overall Project Metrics</h2>
                        <div className='container'>
                            <div className='project_box_main'>
                                <div className='project_box'>
                                    <h3>100</h3>
                                    <p>Beneficiaries Households Impacted</p>
                                </div>
                                <div className='project_box'>
                                    <h3>400</h3>
                                    <p>Total Lives Impacted</p>
                                </div>
                                <div className='project_box'>
                                    <h3>15</h3>
                                    <p>Villages covered</p>
                                </div>
                                <div className='project_box'>
                                    <h3>40%</h3>
                                    <p>Proportion of Commissioned Biostove</p>
                                    <FaStar className='project_box_icon'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='summary_acivity'>
                        <h2>Village wise Activity</h2>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    {/* <div className='activity_chart'>
                                        <CanvasJSChart options = {options} />
                                    </div> */}
                                </div>
                                <div className='col-md-6'>
                                    <div className='activity_map'>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14687.267328509402!2d72.50919378874067!3d23.03049666426422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b353bc60d91%3A0xd5e48ea22ff8d924!2sSatellite%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687768788421!5m2!1sen!2sin" className='w-100 border-0' height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        <p>Location Map</p>
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

export default Home
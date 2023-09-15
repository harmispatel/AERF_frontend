import React from 'react'
import { FaIndianRupeeSign,FaPercent,FaStar } from "react-icons/fa6";
import noData from '../../assets/images/no_data.jpeg'

const DataBox = (props) => {
  return (
    <>
        <div className={props.className1}>
          {
           
            <h3>{props.rupee && <FaIndianRupeeSign size={30} />}{props.amount}{props.kg && <span style={{ fontSize : "20px"}}>Kg</span>}{props.hrs && <span style={{ fontSize : "20px"}}>Hrs</span>}{props.percen && <FaPercent size={35} />}</h3>
            
            // (<img className='no_img' src={noData} alt="no_data" height={100}  />)
          }
            {/* <h3>{props.rupee && <FaIndianRupeeSign size={30} />}{props.amount}{props.percen && <FaPercent size={35} />}</h3> */}
            <p>{props.name}</p>

            {
              props.favourite &&
                <FaStar className={props.className2} />
            }
        </div>
    </>
  )
}
export default DataBox
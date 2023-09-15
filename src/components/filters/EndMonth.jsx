import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown } from "react-icons/fa6";

const EndMonth = (props) => {
    
  return (
    <>
        <DatePicker
            className="form-select form-control w-100"
            selected={props.selected}
            onChange={(date) => props.setdate(date)}
            selectsEnd
            startDate={props.startDate}
            endDate={props.endDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="End Date"
        />

        <span className="icon-box">
            <FaAngleDown className="icon" />
        </span>
    </>
  )
}

export default EndMonth
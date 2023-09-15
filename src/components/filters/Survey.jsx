import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import SurveyFilter from "../../services/common/Survey"

const Survey = (props) => {
    const [Survey,SetSurvey] = useState([])

    useEffect(()=>{
        SurveyData()
    },[])

    const staff = localStorage.getItem('staff') 
    const donor = localStorage.getItem('donor')

    if (donor !== null) {
      var queryParams = `donor_master_id=&staff_master_id=${staff}`;
    }else{
      var queryParams = `donor_master_id=${donor}&staff_master_id=${staff}`;
    }

    const SurveyData = async () =>{
        return await SurveyFilter.surveyId(queryParams).then(response=>{
            SetSurvey(response.data);
        }).catch(err =>{
          console.log(err);
        })
    }
  return (
    <>
        <select className="form-select" value={props.surveyData} onChange={(e) => props.setdata(e.target.value)}aria-label="Default select example">
        <option disabled value="" selected>Select a Survey</option>
            {
              Survey.map((data,id)=>{
                return(
                  <>
                    <option key={id} value={data.a_form_id}>{data.a_form_name}</option>
                  </>
                )})
            }
        </select>
        <span className="icon-box">
            <FaAngleDown className="icon" />
        </span>
    </>
  )
}

export default Survey
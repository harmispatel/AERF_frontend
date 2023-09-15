import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import siteservice from "../../services/common/Site"

const Site = (props) => {
    const [Site,SetSite] = useState([])

    useEffect(()=>{
        SiteData()
    },[])
  
    const SiteData = async () =>{
        return await siteservice.siteId()
        .then(response=>{
            SetSite(response.data);
        }).catch(err =>{
          console.log(err);
        })
    }
  return (
    <>
        <select className="form-select" value={props.siteData} onChange={(e) => props.setdata(e.target.value)}aria-label="Default select example">
        <option disabled value="" selected>Select a Site</option>
            {Site.map((data)=>{
                return(
                  <>
                    <option value={data.a_block_id}>
                      {data.a_block_name}
                    </option>
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

export default Site
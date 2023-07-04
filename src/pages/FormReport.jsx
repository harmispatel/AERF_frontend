import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaDownload , FaMagnifyingGlass , FaUser , FaPhone , FaCalendarDays } from "react-icons/fa6";
import { active_question, profile_info, question_responses, survey_info } from '../services/FormReport';
import DatePicker from "react-datepicker";
import { CSVLink } from 'react-csv';
import Autosuggest from "react-autosuggest";

const FormReport = () => {

  const [startDate, setStartDate] = useState('');
  const [surveyInfo,setSurveyInfo] = useState([])
  const [questionDetails,setQuestionDetails] = useState([])
  const [questionResponses,setQuestionResponses] = useState([])
  const [profileData,setProfileData] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{
    SurveyData()
    ActionDetails()
    ProfileDetails()
    QuestionResponses()
  },[])

  const month = 5;
  const site_id = 1
  const survey_id = 1;
  const beneficiary_id = 1;

  const queryParams = `month=2023-04-01&site_id=${site_id}&survey_id=${survey_id}`
  const profileQuery = `beneficiary_id=${beneficiary_id}`

  const SurveyData = async () =>{
    return await survey_info(queryParams).then(response =>{
      setSurveyInfo(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const ActionDetails = async () =>{
    return await active_question(queryParams).then(response =>{
      setQuestionDetails(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const QuestionResponses = async () =>{
    return await question_responses(queryParams).then(response =>{
      setQuestionResponses(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const ProfileDetails = async () =>{
    return await profile_info(profileQuery).then(response =>{
      setProfileData(response.data.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : questionResponses.filter(item => item.q_id.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setSelectedItem(suggestion);
  };

  const getSuggestionValue = (suggestion) => suggestion.q_id;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.q_id}
    </div>
  );

  console.log(searchValue.length);

  const inputProps = {
    value: searchValue,
    type: "search",
    placeholder: "Enter question",
    onChange: (_, { newValue }) => setSearchValue(newValue)
  };

  return (
    <>
      <div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
        <div className='formreport_main'>
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
                <div className='col-md-2'>
                  <div className='fillter_box'>
                    <div className='form-group'>
                      <select className='form-select form-control'>
                        <option>Survey</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
                      <span className="icon-box"><FaAngleDown className='icon' /></span>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='download_btn text-end'>
                    <button className='btn'>Bulk Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='village_detail_main'>
            <div className='row'>
              <div className='col-md-5'>
                <div className='village_detail_inr h-100'>
                  <h2>Survey Info</h2>
                  {surveyInfo.map((data,id)=>{
                      return(
                        <div className='village_detail_box_main' key={id}>
                          <div className='village_detail_box'>
                            <h3>{data.survey}</h3>
                            <p>Survey Count</p>
                          </div>
                          <div className='village_detail_box'>
                            <h3>{data.survey_to_beneficiary}</h3>
                            <p>Survey to Beneficiary %</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='col-md-7'>
                <div className='data_table'>
                  <div className='data_table_header'>
                    <h2>Form Active Question Details</h2>
                    <span className='csv_bt'><CSVLink data={questionDetails}><FaDownload className='icon' /></CSVLink></span>
                  </div>
                  <table className='table m-0'>
                    <thead>
                      <tr className='text-center'>
                        <th>Q.ID</th>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionDetails.map((data,id) =>{
                          return(
                            <tr className='text-center' key={id}>
                              <td>{id+1}</td>
                              <td>{data.question}</td>
                              <td>{data.options}</td>
                              <td>{data.date}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='data_table qna_data_table filter_data_table'>
              <h2>Question Responses</h2>
            <div className='data_table_header'>
              <div className='data_search'>
                <Autosuggest
                  className="form-control"
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  alwaysRenderSuggestions={true}
                  inputProps={inputProps}
               />
                {
                  searchValue.length === 0 &&
                    <FaMagnifyingGlass className="icon" />
                }
              </div>
              <div className='user_info'>
                {profileData.map((data,id)=>{
                    return(
                      <ul key={id}>
                        <li>
                          <FaUser className='icon'/>
                          <label>{data.name}</label>
                        </li>
                        <li>
                          <FaPhone className='icon'/>
                          <label>{data.phone}</label>
                        </li>
                        <li>
                          <FaCalendarDays className='icon'/>
                          <label>{data.date}</label>
                        </li>
                      </ul>
                    )
                  })
                }
              </div>
              <span className='csv_bt'><CSVLink data={questionResponses}><FaDownload className='icon' /></CSVLink></span>
            </div>
            <table className='table m-0'>
              <thead>
                <tr className='text-center'>
                  <th>Q.ID</th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              {
                selectedItem ? (
                <tbody>
                  <tr className='text-center'>
                    <td>1</td>
                    <td>{selectedItem.q_id}</td>
                    <td>{selectedItem.answer}</td>
                  </tr>
                </tbody>)
               : (
                  <tbody>
                    {questionResponses.map((data,id) =>{
                      return (
                        <tr className='text-center' key={id}>
                          <td>{id + 1}</td>
                          <td>{data.q_id}</td>
                          <td>{data.answer}</td>
                        </tr>
                      )})
                    }
                  </tbody>
                )
              }
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormReport
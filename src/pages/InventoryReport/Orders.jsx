import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  FaAngleDown,
  FaCheck,
  FaPenToSquare,
  FaTrash,
  FaDownload,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { orders } from "../../services/Order";

const Orders = () => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [ordersData,setOrdersData] = useState([])

  useEffect(()=>{
    OrdersList()
  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const queryParams = `month=2023-06-01`

  const OrdersList = async () =>{
    return await orders(queryParams).then(response=>{
      setOrdersData(response.data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen="750"
      >
        <div className="order_main">
          <div className="fillter_part">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <div className="fillter_box">
                    <h3>Fillter</h3>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <DatePicker
                        className="form-select form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MMMM yyyy"
                        placeholderText="Select a year"
                        showMonthYearPicker
                      />
                      <span className="icon-box">
                        <FaAngleDown className="icon" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order_inventory">
            <div className="data_table">
              <div className="data_table_header">
                <h2>Intent Details</h2>

                <div className="table_filter">
                  <h3>Filter :</h3>
                  <button className="badge rounded-pill">Allocated</button>
                  <button className="badge rounded-pill">Pendding</button>
                </div>

                <div className="order_data_table_bt d-flex align-items-center">
                  <button className="btn add_bt" onClick={handleShow}>
                    New Intent
                  </button>
                  <span>
                    <FaDownload className="icon" />
                  </span>
                </div>
              </div>
              <table className="table m-0">
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
                  {
                    ordersData.map(data =>{
                      return(
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.Requester}</td>
                          <td>{data.site}</td>
                          <td>{data.Donor}</td>
                          <td>{data.Requested_Quantity}</td>
                          <td>{data.delivery_date}</td>
                          <td>{data.delivered}</td>
                          <td>
                            <label className="tb_check">
                              <input type="checkbox" />
                              <span className="checkmark">
                                <FaCheck className="check_icon" />
                              </span>
                            </label>
                          </td>
                          <td>
                            <div className="action_bt">
                              <button
                                onClick={handleShow}
                                className="btn btn-success"
                              >
                                <FaPenToSquare />
                              </button>
                              <Link to="#" className="btn btn-danger">
                                <FaTrash />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                  {/* 
                  <tr>
                    <td>2</td>
                    <td>Pratik</td>
                    <td>pen</td>
                    <td>Donor2</td>
                    <td>300</td>
                    <td>2023-07-28</td>
                    <td>
                      <label className="tb_check">
                        <input type="checkbox" />
                        <span className="checkmark">
                          <FaCheck className="check_icon" />
                        </span>
                      </label>
                    </td>
                    <td>
                      <div className="action_bt">
                        <button
                          onClick={handleShow}
                          className="btn btn-success"
                        >
                          <FaPenToSquare />
                        </button>
                        <Link to="#" className="btn btn-danger">
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>

          {/*modal */}
          <Modal
            className="form_intent"
            centered
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Intent Form</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Size</Form.Label>
                    <Form.Select
                      className="form_input"
                      defaultValue="Choose..."
                    >
                      <option>Dropdown</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Donor</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option>Dropdown</option>
                      <option>...</option>
                      <span>
                        <FaAngleDown className="icon" />
                      </span>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control placeholder="Numeric Field" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Expected Date of Delivery</Form.Label>
                    <DatePicker
                      className="form_Datepicker"
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Orders;

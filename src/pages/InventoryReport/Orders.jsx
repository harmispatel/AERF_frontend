import React, { useState } from "react";
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

const Orders = () => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                      <select className="form-select form-control">
                        <option>Month</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                      </select>
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
                  <tr>
                    <td>1</td>
                    <td>Subham</td>
                    <td>Lanja</td>
                    <td>Donor_1</td>
                    <td>500</td>
                    <td>2023-07-31</td>
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
                        <Link
                          to="#"
                          className="btn btn-danger"
                        >
                          <FaTrash />
                        </Link>
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
                        <Link
                          to="#"
                          className="btn btn-danger"
                        >
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/*modal */}
          <Modal className="form_intent" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Intent Form</Modal.Title>
            </Modal.Header>

            <Modal.Body>            
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Size</Form.Label>
                    <Form.Select className="form_input" defaultValue="Choose...">
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
                    <DatePicker className="form_Datepicker" showIcon selected={startDate} onChange={(date) => setStartDate(date)}/>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }}/>
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

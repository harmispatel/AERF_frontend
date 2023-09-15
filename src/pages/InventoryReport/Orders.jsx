import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaCheck, FaDownload, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";
import OrdersService from "../../services/Order";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import EndMonth from "../../components/filters/EndMonth";
import StartMonth from "../../components/filters/StartMonth";

const Orders = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [formDropData, setFormDropData] = useState("");
  const [intentFormData, setIntentFormData] = useState({
    site: "",
    warehouse: "",
    donor: "",
    quantity: "",
    date: "",
    remark: "",
  });

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [editOrders, setEditOrders] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState({
    intentId: [],
    changeStatus: [],
  });

  useEffect(() => {
    // OrdersList();

    const FormParams = sessionStorage.getItem("order_filter");
    const startMonthFromSession = sessionStorage.getItem("orderStartMonth");
    const endMonthFromSession = sessionStorage.getItem("orderEndMonth");

    if (startMonthFromSession || endMonthFromSession) {
      setStartDate(new Date(startMonthFromSession));
      setEndDate(new Date(endMonthFromSession));
    }

    console.log(FormParams);

    OrdersList(FormParams);
    DropdownData();
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setSelectedData(null);
    setShow(false);
    setShowEdit(false);
  };

  const DropdownData = async () => {
    return await OrdersService.dropdowns()
      .then((response) => {
        setFormDropData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OrdersList = async (queryParams) => {
    return await OrdersService.orders(queryParams)
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = async (e) => {
    e.preventDefault();

    const startMonth = moment(startDate).format("yyyy-MM-DD");
    const endMonth = moment(endDate).format("yyyy-MM-DD");
    const queryParams = `start_date=${startMonth}&end_date=${endMonth}`;

    sessionStorage.setItem("order_filter", queryParams);
    sessionStorage.setItem("orderStartMonth", startMonth);
    sessionStorage.setItem("orderEndMonth", endMonth);

    await OrdersList(queryParams);
  };

  const handleDelivered = () => {
    setDelivered(!delivered);
    setOrdered(false);
    OrdersList();
    setSelectedChecks({ intentId: [], changeStatus: [] });
  };

  const handleOrdered = () => {
    setOrdered(!ordered);
    setDelivered(false);
    OrdersList();
    setSelectedChecks({ intentId: [], changeStatus: [] });
  };

  const filteredIntenDetails =
    ordersData !== undefined &&
    ordersData.filter((data) => {
      if (delivered && data?.delivered === 1) {
        return true;
      }
      if (ordered && data?.delivered === 0) {
        return true;
      }
      return false;
    });

  const handleChange = (e) => {
    setIntentFormData({ ...intentFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const staff = localStorage.getItem("staff");

    formData.append("staff_id", staff);
    formData.append("warehouse_id", intentFormData.warehouse);
    formData.append("block_id", intentFormData.site);
    formData.append("donor_phase_id", intentFormData.donor);
    formData.append("quantity_ordered", intentFormData.quantity);
    formData.append(
      "delivery_date",
      moment(intentFormData.date).format("yyyy-MM-DD")
    );
    formData.append("remarks", intentFormData.remark);

    await OrdersService.insert_data(formData)
      .then((res) => {
        if (res.success === true) {
          swal({
            title: "Success!",
            text: res.message,
            icon: "success",
          });
          OrdersList();
          setShow(false);
        } else {
          {
            swal({
              title: "oops!",
              text: res.message,
              icon: "error",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = async (data) => {
    await OrdersService.get_data(data.intent_id).then((res) => {
      console.log(res);
      if (res) {
        setSelectedData(res.data[0]);
        setEditOrders(res.data[0]);
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };

  const handleUpdate = async (e, selectedData) => {
    e.preventDefault();

    const formData = new FormData();
    const staff = localStorage.getItem("staff");

    formData.append("staff_id", staff);
    formData.append(
      "warehouse_id",
      selectedData.warehouse
        ? selectedData.warehouse
        : editOrders.a_warehouse_id
    );
    formData.append(
      "block_id",
      selectedData.site ? selectedData.site : editOrders.a_block_id
    );
    formData.append(
      "donor_phase_id",
      selectedData.donor ? selectedData.donor : editOrders.d_donor_phase_id
    );
    formData.append(
      "quantity_ordered",
      selectedData.quantity
        ? selectedData.quantity
        : editOrders.quantity_ordered
    );
    formData.append(
      "delivery_date",
      moment(selectedData.date).format("yyyy-MM-DD")
    );
    formData.append(
      "remarks",
      selectedData.remark ? selectedData.remark : editOrders.remarks
    );
    formData.append("intent_id", selectedData.intent_id);

    try {
      const res = await OrdersService.update_data(formData);
      if (res.success === true) {
        swal({
          title: "Success!",
          text: res.message,
          icon: "success",
        });
        OrdersList();
        setShowEdit(false);
      } else {
        {
          swal({
            title: "oops!",
            text: res.message,
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCars = async (data) => {
    const formData = new FormData();
    const staff = localStorage.getItem("staff");

    formData.append("staff_id", staff);
    formData.append("intent_id", data.intent_id);

    swal({
      title: "Are you sure?",
      text: "Are sure want to delete this order?'",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        OrdersService.delete_data(formData)
          .then((res) => {
            if (res.success === true) {
              swal({
                title: "Done!",
                text: "Order is deleted",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                button: "Okay",
              });
              OrdersList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleCheckboxChange = (e, id) => {
    const { value, checked } = e.target;
    const SelectId = checked ? 1 : 0;

    setSelectedChecks((prevSelectedChecks) => {
      const intentIdIndex = prevSelectedChecks.intentId.indexOf(id);

      if (intentIdIndex !== -1) {
        // ID already exists, update the corresponding value
        const updatedChangeStatus = [...prevSelectedChecks.changeStatus];
        updatedChangeStatus[intentIdIndex] = SelectId;

        return {
          intentId: prevSelectedChecks.intentId,
          changeStatus: updatedChangeStatus,
        };
      } else {
        // ID doesn't exist, add it to the arrays
        return {
          intentId: [...prevSelectedChecks.intentId, id],
          changeStatus: [...prevSelectedChecks.changeStatus, SelectId],
        };
      }
    });
  };

  const handleOrderStatus = async (e) => {
    e.preventDefault();

    const staff = localStorage.getItem("staff");

    const formData = new FormData();
    formData.append("staff_id", staff);
    formData.append("intent_id_list", selectedChecks.intentId);
    formData.append("change_list", selectedChecks.changeStatus);

    await OrdersService.update_delivery(formData)
      .then((res) => {
        if (res.success === true) {
          swal({
            title: "Success!",
            text: res.message,
            icon: "success",
          });
          OrdersList();
        } else {
          {
            swal({
              title: "oops!",
              text: res.message,
              icon: "error",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                    <h3>Filter</h3>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <StartMonth
                        selected={startDate}
                        setdate={setStartDate}
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="fillter_box">
                    <div className="form-group">
                      <EndMonth
                        selected={endDate}
                        setdate={setEndDate}
                        startDate={endDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2 text-end">
                  <butoon
                    type="button"
                    onClick={handleFilter}
                    className="btn admin-btn"
                  >
                    Submit
                  </butoon>
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
                <button
                  className={
                    delivered === true
                      ? "badge rounded-pill active"
                      : "badge rounded-pill"
                  }
                  onClick={handleDelivered}
                >
                  Delivered
                </button>
                <button
                  className={
                    ordered === true
                      ? "badge rounded-pill active"
                      : "badge rounded-pill"
                  }
                  onClick={handleOrdered}
                >
                  Ordered
                </button>
              </div>

              <div className="order_data_table_bt d-flex align-items-center">
                <button className="btn add_bt" onClick={handleShow}>
                  New Intent
                </button>
                <span className="csv_bt">
                  {ordersData !== undefined && (
                    <CSVLink data={ordersData} filename={"Intent-Details"}>
                      <FaDownload className="icon" />
                    </CSVLink>
                  )}
                </span>
              </div>
            </div>
            <div className="order_table">
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Requester</th>
                    <th>Site</th>
                    <th>WareHouse</th>
                    <th>Donor</th>
                    <th>Requested Quantity</th>
                    <th>Date Expected</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {ordersData?.length === 0 || ordersData === undefined ? (
                  <tbody>
                    <tr>
                      <td colspan="8" class="text-center">
                        <span className="text-danger">
                          <strong>No Data Available</strong>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <>
                    {delivered === true || ordered === true ? (
                      <tbody>
                        {filteredIntenDetails.map((data, id) => {
                          const isChecked = data.delivered === 1;

                          return (
                            <tr>
                              <td>{data.intent_id}</td>
                              <td>{data.Requester}</td>
                              <td>{data.a_block_name}</td>
                              <td>{data.a_warehouse_name}</td>
                              <td>{data.d_phase_name}</td>
                              <td>{data.quantity_ordered}</td>
                              <td>
                                {moment(data.delivery_date).format(
                                  "yyyy-MM-DD"
                                )}
                              </td>
                              {/* <td>{data.delivered}</td> */}
                              <td>
                                <label className="tb_check">
                                  <input
                                    type="checkbox"
                                    value={data.intent_id}
                                    checked={isChecked}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, data.intent_id)
                                    }
                                  />

                                  <span className="checkmark">
                                    <FaCheck className="check_icon" />
                                  </span>
                                </label>
                              </td>
                              <td>
                                <div className="action_bt">
                                  <button
                                    onClick={() => handleEdit(data)}
                                    className="btn btn-success"
                                  >
                                    <FaPenToSquare />
                                  </button>
                                  <Link
                                    to="#"
                                    className="btn btn-danger"
                                    onClick={(e) => deleteCars(data)}
                                  >
                                    <FaTrash />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <tbody>
                        {ordersData !== undefined &&
                          ordersData.map((data, id) => {
                            return (
                              <tr>
                                <td>{data.intent_id}</td>
                                <td>{data.Requester}</td>
                                <td>{data.a_block_name}</td>
                                <td>{data.a_warehouse_name}</td>
                                <td>{data.d_phase_name}</td>
                                <td>{data.quantity_ordered}</td>
                                <td>
                                  {moment(data.delivery_date).format(
                                    "yyyy-MM-DD"
                                  )}
                                </td>
                                {/* <td>{data.delivered}</td> */}
                                <td>
                                  <label className="tb_check">
                                    <input
                                      type="checkbox"
                                      value={data.intent_id}
                                      defaultChecked={data.delivered === 1}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, data.intent_id)
                                      }
                                    />
                                    <span className="checkmark">
                                      <FaCheck className="check_icon" />
                                    </span>
                                  </label>
                                </td>
                                <td>
                                  <div className="action_bt">
                                    <button
                                      onClick={() => handleEdit(data)}
                                      className="btn btn-success"
                                    >
                                      <FaPenToSquare />
                                    </button>
                                    <Link
                                      to="#"
                                      className="btn btn-danger"
                                      onClick={(e) => deleteCars(data)}
                                    >
                                      <FaTrash />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    )}
                  </>
                )}
              </table>
            </div>
          </div>
        </div>

        {/*Addmodal */}
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
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Site</Form.Label>
                  <Form.Select name="site" onChange={(e) => handleChange(e)}>
                    <option value="" disabled selected>
                      Select Site
                    </option>
                    {formDropData &&
                      formDropData.site &&
                      formDropData.site.map((site) => (
                        <option key={site.site_id} value={site.site_id}>
                          {site.site_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Select
                    name="warehouse"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" disabled selected>
                      Select Warehouse
                    </option>
                    {formDropData &&
                      formDropData.warehouse &&
                      formDropData.warehouse.map((warehouse) => (
                        <option
                          key={warehouse.warehouse_id}
                          value={warehouse.warehouse_id}
                        >
                          {warehouse.a_warehouse_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Donor</Form.Label>
                  <Form.Select name="donor" onChange={(e) => handleChange(e)}>
                    <option value="" disabled selected>
                      Select Donor
                    </option>
                    {formDropData &&
                      formDropData.donor &&
                      formDropData.donor.map((donor) => (
                        <option
                          key={donor.donor_phase_id}
                          value={donor.donor_phase_id}
                        >
                          {donor.donor}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    onChange={(e) => handleChange(e)}
                    placeholder="Numeric Field"
                    type="number"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Expected Date of Delivery</Form.Label>
                  <DatePicker
                    className="form-select form-control w-100"
                    selected={intentFormData.date}
                    onChange={(date) =>
                      setIntentFormData({ ...intentFormData, date: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a Date"
                    calendarClassName="rasta-stripes"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    name="remark"
                    onChange={(e) => handleChange(e)}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/*Editmodal */}
        <Modal
          className="form_intent"
          centered
          show={showEdit}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={(e) => handleUpdate(e, selectedData)}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Site</Form.Label>
                  <Form.Select
                    defaultValue={selectedData?.a_block_id}
                    name="site"
                    onChange={(e) =>
                      handleEditChange(e, "site", e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Select Site
                    </option>
                    {formDropData &&
                      formDropData.site &&
                      formDropData.site.map((site) => (
                        <option key={site.site_id} value={site.site_id}>
                          {site.site_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Select
                    defaultValue={selectedData?.a_warehouse_id}
                    name="warehouse"
                    onChange={(e) =>
                      handleEditChange(e, "warehouse", e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Select Warehouse
                    </option>
                    {formDropData &&
                      formDropData.warehouse &&
                      formDropData.warehouse.map((warehouse) => (
                        <option
                          key={warehouse.warehouse_id}
                          value={warehouse.warehouse_id}
                        >
                          {warehouse.a_warehouse_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Donor</Form.Label>
                  <Form.Select
                    name="donor"
                    defaultValue={selectedData?.d_donor_phase_id}
                    onChange={(e) =>
                      handleEditChange(e, "donor", e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Select Donor
                    </option>
                    {formDropData &&
                      formDropData.donor &&
                      formDropData.donor.map((donor) => (
                        <option
                          key={donor.donor_phase_id}
                          value={donor.donor_phase_id}
                        >
                          {donor.donor}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    defaultValue={selectedData?.quantity_ordered}
                    onChange={(e) =>
                      handleEditChange(e, "quantity", e.target.value)
                    }
                    placeholder="Numeric Field"
                    type="number"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Expected Date of Delivery</Form.Label>
                  <DatePicker
                    className="form-select form-control w-100"
                    selected={intentFormData.date}
                    onChange={(date) =>
                      setSelectedData({ ...selectedData, date: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a year"
                    calendarClassName="rasta-stripes"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    name="remark"
                    defaultValue={selectedData?.remarks}
                    onChange={(e) =>
                      handleEditChange(e, "remark", e.target.value)
                    }
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {selectedChecks.changeStatus.length > 0 && (
          <div className="text-center my-5">
            <button className="btn admin-btn" onClick={handleOrderStatus}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;

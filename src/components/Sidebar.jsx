import React, { useState } from "react";
import "./index.css";
import { Link, useLocation } from "react-router-dom";
// import { FaAngleDown, FaAngleLeft } from "react-icons/fa6";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projectReport,setProjectReport] = useState(false)
  const [inventoryReport,setInventoryReport] = useState(false)

  const location = useLocation();

  const currentRoute = location.pathname;

  console.log(currentRoute);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProjectReport = () =>{
    setProjectReport(!projectReport)
  }

  const handleInventoryReport = () =>{
    setInventoryReport(!inventoryReport)
  }

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        
        {/* <!-- Sidebar --> */}
        <div className="sidebar">

          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item" >
                <Link to="dashboard" className={ currentRoute === '/dashboard' ? "nav-link active" : "nav-link" }>
                  <p>Executive Dashboards</p>
                </Link>
              </li>
              <li className={`nav-item ${isDropdownOpen ? 'open' : ''}`}>
                <Link to="#" className={isDropdownOpen ? "nav-link active" : "nav-link" } onClick={handleDropdownClick}>
                  <p>Biostove project</p>
                </Link>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link className={projectReport ? "nav-link active" : "nav-link"} to="#"  onClick={handleProjectReport}>Project Report</Link>

                      {projectReport && (
                        <ul className="dropdown-submenu">
                          <li className="nav-item">
                            <Link to="project-report/summary-report" className={currentRoute === '/project-report/summary-report' ? "nav-link active" : "nav-link" }>Summary Report</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="project-report/village-details" className={currentRoute === '/project-report/village-details' ? "nav-link active" : "nav-link" }>Village Details</Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link className={currentRoute === '/field-report' ? "nav-link active" : "nav-link" } to="field-report">Field Report</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={currentRoute === '/form-report' ? "nav-link active" : "nav-link" } to="form-report">Form Report</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={inventoryReport ? "nav-link active" : "nav-link"} to="#" onClick={handleInventoryReport}>Inventory Report</Link>

                      {inventoryReport && (
                        <ul className="dropdown-submenu">
                          <li className="nav-item">
                            <Link className={currentRoute === '/overall-inventory' ? "nav-link active" : "nav-link" } to="overall-inventory">Overall Inventory</Link>
                          </li>
                          <li className="nav-item">
                            <Link className={currentRoute === '/orders' ? "nav-link active" : "nav-link" } to="orders">Orders</Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Add more items as needed */}
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p>Project - II</p>
                </a>
              </li>
        </ul>

          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </>
  );
};

export default Sidebar;

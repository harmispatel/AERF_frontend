import React, { useState } from "react";
import "./index.css";
// import { FaAngleDown, FaAngleLeft } from "react-icons/fa6";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projectReport,setProjectReport] = useState(false)
  const [inventoryReport,setInventoryReport] = useState(false)

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
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p>Executive Dashboards</p>
                </a>
              </li>
              <li className={`nav-item ${isDropdownOpen ? 'open' : ''}`}>
                <a href="#" className={isDropdownOpen ? "nav-link active" : "nav-link" } onClick={handleDropdownClick}>
                  <p>Biostove project</p>
                </a>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={handleProjectReport}>Project Report</a>

                      {projectReport && (
                        <ul className="dropdown-submenu">
                          <li className="nav-item">
                            <a className={projectReport ? "nav-link active" : "nav-link" }  href="#">Summary Report</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Village Details</a>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Field Report</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Form Report</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={handleInventoryReport}>Inventory Report</a>

                      {inventoryReport && (
                        <ul className="dropdown-submenu">
                          <li className="nav-item">
                            <a className="nav-link" href="#">Overall Inventory</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Orders</a>
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

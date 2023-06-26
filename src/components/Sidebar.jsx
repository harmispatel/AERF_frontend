import React from "react";
import "./index.css";

const Sidebar = () => {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p>Executive Dashboards</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p>Biostove project</p>
                </a>
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

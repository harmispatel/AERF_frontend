import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Summary from "./pages/ProjectReport/Summary";
import Village from "./pages/ProjectReport/Village";
import FieldReport from "./pages/FieldReport";
import FormReport from "./pages/FormReport";
import Overall from "./pages/InventoryReport/Overall";
import Orders from "./pages/InventoryReport/Orders";
import { Login } from "./pages/auth/login";
import { useState } from "react";
import Forget from "./pages/auth/Forget";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const storedToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!storedToken;

  const PrivateRoute = ({ path, element }) => {
    return loggedIn || isLoggedIn ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: path }} />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PrivateRoute element={<Summary />} />} />
        <Route
          path="project-report/summary-report"
          element={<PrivateRoute element={<Summary />} />}
        />
        <Route
          path="project-report/village-details"
          element={<PrivateRoute element={<Village />} />}
        />
        <Route
          path="field-report"
          element={<PrivateRoute element={<FieldReport />} />}
        />
        <Route
          path="form-report"
          element={<PrivateRoute element={<FormReport />} />}
        />
        <Route
          path="overall-inventory"
          element={<PrivateRoute element={<Overall />} />}
        />
        <Route path="orders" element={<PrivateRoute element={<Orders />} />} />
      </Route>
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/forget-password" element={<Forget setLoggedIn={setLoggedIn} />} />
    </Routes>
  );
}

export default App;

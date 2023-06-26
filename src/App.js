import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import 'admin-lte/dist/css/adminlte.css';
import 'admin-lte/dist/js/adminlte.min.js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Summary from './pages/ProjectReport/Summary';
import Village from './pages/ProjectReport/Village';
import FieldReport from './pages/FieldReport';
import FormReport from './pages/FormReport';
import Overall from './pages/InventoryReport/Overall';
import Orders from './pages/InventoryReport/Orders';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}  />
          <Route path='dashboard' element={<Dashboard />}  />
          <Route path='summary-report' element={<Summary />}  />
          <Route path='village-details' element={<Village />}  />
          <Route path='field-report' element={<FieldReport />}  />
          <Route path='form-report' element={<FormReport />}  />
          <Route path='overall-inventory' element={<Overall/>}  />
          <Route path='orders' element={<Orders />}  />
        </Route>
      </Routes>
    </>
  );
}

export default App

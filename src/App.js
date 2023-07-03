import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Summary from './pages/ProjectReport/Summary';
import Village from './pages/ProjectReport/Village';
import FieldReport from './pages/FieldReport';
import FormReport from './pages/FormReport';
import Overall from './pages/InventoryReport/Overall';
import Orders from './pages/InventoryReport/Orders';
import { Login } from './pages/auth/login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route index element={<Home />}  /> */}
          <Route index element={<Summary />}  />
          <Route path='project-report/summary-report' element={<Summary />}  />
          <Route path='project-report/village-details' element={<Village />}  />
          <Route path='field-report' element={<FieldReport />}  />
          <Route path='form-report' element={<FormReport />}  />
          <Route path='overall-inventory' element={<Overall/>}  />
          <Route path='orders' element={<Orders />}  />
        </Route>
        <Route path='login' element={<Login />}  />
      </Routes>
    </>
  );
}

export default App

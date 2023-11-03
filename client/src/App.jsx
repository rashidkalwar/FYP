import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Datasets from './pages/Datasets/Datasets';
import Visualizations from './pages/Visualizations/Visualizations';
import Analytics from './pages/Analytics/Analytics';

import HomeNavbar from './components/HomeNavbar/HomeNavbar';
import DashboardNavbar from './components/DashboardNavbar/DashboardNavbar';

// extras
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<HomeNavbar />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/dashboard" element={<DashboardNavbar />}>
          <Route index element={<Dashboard />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="visualizations" element={<Visualizations />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

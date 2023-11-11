import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// pages
import Home from './pages/Home';
import Page404 from './pages/404';
import Dashboard from './pages/Dashboard';
import Datasets from './pages/Datasets';
import Visualizations from './pages/Visualizations';
import Analytics from './pages/Analytics';
import CreateVisualization from './pages/Visualizations/Create';
import StepOne from './pages/Visualizations/Create/StepOne';
import StepTwo from './pages/Visualizations/Create/StepTwo';
import StepThree from './pages/Visualizations/Create/StepThree';

import HomeNavbar from './components/Navbar';
import DashboardNavbar from './components/DashboardNavbar';

// Other Routes
import AuthRoutes from './pages/Authorization/routes';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<HomeNavbar />}>
          <Route index element={<Home />} />
          <Route path="*" element={<AuthRoutes />} />
        </Route>

        {/* Protected routes */}
        <Route path="/dashboard" element={<DashboardNavbar />}>
          <Route index element={<Dashboard />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="visualizations">
            <Route index element={<Visualizations />} />
            <Route path="create" element={<CreateVisualization />}>
              <Route index element={<StepOne />} />
              <Route path="step-1" element={<StepOne />} />
              <Route path="step-2" element={<StepTwo />} />
              <Route path="step-3" element={<StepThree />} />
            </Route>
          </Route>
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;

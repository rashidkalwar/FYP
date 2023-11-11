import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Registration';

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AuthRoutes;

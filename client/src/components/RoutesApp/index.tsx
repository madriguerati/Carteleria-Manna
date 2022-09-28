import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Home from './../../pages/Home';
import Register from './../../pages/Register';

const RoutesApp = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/account/register" element={<Register />} />
    </Routes>
  )
}

export default RoutesApp

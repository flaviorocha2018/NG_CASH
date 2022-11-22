import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {Login} from '../pages/login/Login';
import {Register} from '../pages/login/Register';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route  path= "*" element={ <Navigate to="/login" /> } />
      <Route  path="/login" element={ <Login /> } />
      <Route  path="/register" element={ <Register /> } />
    </Routes>
  );
}
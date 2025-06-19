import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import {Login} from './pages/Login';
import './index.css';
import { Dashboard } from './pages/Dashboard';
import { Register } from './pages/Register';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)

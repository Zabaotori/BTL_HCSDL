import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './LogIn/LogIn.jsx'
import Header from './HeaderFooter/Header.jsx'
import KhamPha from './KhamPha/KhamPha.jsx'
import CourseParam from './CourseParam.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path='/header' element={<Header></Header>}>
            <Route index element={<KhamPha></KhamPha>}></Route>
            <Route path='courseParam' element={<CourseParam></CourseParam>}></Route>
          </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

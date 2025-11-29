import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './LogIn/LogIn.jsx'
import Header from './HeaderFooter/Header.jsx'
import KhamPha from './KhamPha/KhamPha.jsx'
import CourseParam from './ParamCourse/CourseParam.jsx'
import MyCourse from './MyCourse/MyCourse.jsx'
import TeacherCourses from './Teacher/TeacherCourses.jsx'
import CourseDetail from './Teacher/CourseDetail.jsx'
import QuestionBank from './Teacher/QuestionBank.jsx'
import CreateTest from './Teacher/CreateTest.jsx'
import InstructorLayout from './Instructor/InstructorLayout.jsx'
import InstructorDashboard from './Instructor/InstructorDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/instructor" replace />} />

          <Route path='/student' element={<Header></Header>}>
            <Route index element={<KhamPha></KhamPha>}></Route>
            <Route path='courseParam' element={<CourseParam></CourseParam>}></Route>
            <Route path='myCourse' element={<MyCourse></MyCourse>}></Route>
          </Route>

          <Route path='/teacher' element={<Header></Header>}>
            <Route index element={<TeacherCourses></TeacherCourses>}></Route>
            <Route path='course/:courseId' element={<CourseDetail></CourseDetail>}></Route>
            <Route path='course/:courseId/questions' element={<QuestionBank></QuestionBank>}></Route>
            <Route path='course/:courseId/create-test' element={<CreateTest></CreateTest>}></Route>
          </Route>

          <Route path='/instructor' element={<InstructorLayout></InstructorLayout>}>
            <Route index element={<InstructorDashboard></InstructorDashboard>}></Route>
            <Route path='course/:courseId' element={<CourseDetail></CourseDetail>}></Route>
            <Route path='course/:courseId/questions' element={<QuestionBank></QuestionBank>}></Route>
            <Route path='course/:courseId/create-test' element={<CreateTest></CreateTest>}></Route>
          </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

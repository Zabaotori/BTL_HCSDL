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
import Certificate from './Certificate/Certifficate.jsx'
import Forum from './Forum/Forum.jsx'
import TakeTest from './ParamCourse/TakeTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path='/student' element={<Header></Header>}>
            <Route index element={<KhamPha></KhamPha>}></Route>
            <Route path='courseParam'>
              <Route path=":id" element={<CourseParam></CourseParam>}></Route>
            </Route>
            <Route path='courseParam/:id/forum/:forumId' element={<Forum></Forum>}></Route>
            <Route path='courseParam/:id/test/:testId' element={<TakeTest></TakeTest>}></Route>
            <Route path='myCourse' element={<MyCourse></MyCourse>}></Route>
            <Route path='myCertificate' element={<Certificate></Certificate>}></Route>
          </Route>

          <Route path='/teacher' element={<Header></Header>}>
            <Route index element={<TeacherCourses></TeacherCourses>}></Route>
            <Route path='course/:courseId' element={<CourseDetail></CourseDetail>}></Route>
            <Route path='course/:courseId/questionsbank/:questionbankId' element={<QuestionBank></QuestionBank>}></Route>
            <Route path='course/:courseId/create-test/:create-testId' element={<CreateTest></CreateTest>}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

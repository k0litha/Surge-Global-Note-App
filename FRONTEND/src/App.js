import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import UserReg from './pages/UserReg'
import Student from './pages/Student'
import AdminRoute from './privateroutes/AdminRoute'
import StudentRoute from './privateroutes/StudentRoute'
import TempUserRoute from './privateroutes/TempUserRoute'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<AdminRoute/>}>
        <Route element={<Admin/>} path="/admin" exact/>
      </Route>
      <Route element={<StudentRoute/>}>
        <Route element={<Student/>} path="/student" exact/>
      </Route>
      <Route element={<TempUserRoute/>}>
        <Route element={<UserReg/>} path="/reg" exact/>
      </Route>
      <Route exact path="/" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

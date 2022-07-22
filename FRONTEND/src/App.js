import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import UserReg from './pages/UserReg'
import Student from './pages/Student'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/student" element={<Student/>} />
      <Route exact path="/register" element={<UserReg/>} />
    </Routes>
    </BrowserRouter>
  )
}

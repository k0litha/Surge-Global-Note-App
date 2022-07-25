import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import AdminHome from './pages/AdminHome'
import UserReg from './pages/UserReg'
import Notes from './pages/Notes'
import CreateNote from './pages/CreateNote'
import AdminRoute from './privateroutes/AdminRoute'
import StudentRoute from './privateroutes/StudentRoute'
import TempUserRoute from './privateroutes/TempUserRoute'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<AdminRoute/>}>
        <Route element={<CreateUser/>} path="/admin/create" exact/>
        <Route element={<AdminHome/>} path="/admin" exact/>
      </Route>
      <Route element={<StudentRoute/>}>
        <Route element={<Notes/>} path="/notes" exact/>
        <Route element={<CreateNote/>} path="/notes/create" exact/>
      </Route>

      <Route element={<TempUserRoute/>}>
        <Route element={<UserReg/>} path="/reg" exact/>
      </Route>
      <Route exact path="/" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

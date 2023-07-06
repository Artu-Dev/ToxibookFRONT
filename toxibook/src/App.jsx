import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import NavBottom from './components/navBottom/NavBottom'

function App() {

  return (
    <>
      <Outlet/>
      <NavBottom />
    </>
  )
}

export default App

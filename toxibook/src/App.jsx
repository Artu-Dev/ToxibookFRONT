import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBottom } from './components/NavBottom/NavBottom.jsx'

function App() {
  return (
    <>
      <Outlet/>
      <NavBottom />
    </>
  )
}

export default App

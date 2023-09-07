import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBottom } from './components/NavBottom/NavBottom.jsx'
import { PostProvider } from './contexts/PostContext'
import { AuthUserProvider } from './contexts/AuthUser'

function App() {
  return (
    <>
      <AuthUserProvider>
        <PostProvider>
          <Outlet/>
          <NavBottom />
        </PostProvider>
      </AuthUserProvider>
    </>
  )
}

export default App

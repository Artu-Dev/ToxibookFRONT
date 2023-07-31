import './App.css'
import { Outlet } from 'react-router-dom'
import NavBottom from './components/navBottom/NavBottom'
import { UserContext } from './contexts/AuthUser'
import { useEffect, useState } from 'react';
import { isLoggedInService } from './services/user.services';

function App() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("AuthToken");

  useEffect(() => {
    async function fetchUser() {
      const userResponse = await isLoggedInService(token);
      setUser(userResponse)
    }

    fetchUser();
  }, [token]);

  return (
    <>
      <UserContext.Provider value={user}>
        <Outlet/>
        <NavBottom />
      </UserContext.Provider>
    </>
  )
}

export default App

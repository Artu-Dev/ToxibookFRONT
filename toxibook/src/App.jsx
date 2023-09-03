import './App.css'
import { Outlet } from 'react-router-dom'
import NavBottom from './components/navBottom/NavBottom'
import { UserContext } from './contexts/AuthUser'
import { PostProvider } from './contexts/PostContext'
import { useEffect, useState } from 'react';
import { isLoggedInService } from './services/user.services';

function App() {
  const [user, setUser] = useState([]);
  // const token = localStorage.getItem("AuthToken");

  // useEffect(() => {
  //   async function fetchUser() {
  //     const userResponse = await isLoggedInService(token);
  //     setUser(userResponse)
  //   }

  //   fetchUser(); 
  // }, [token]); // desativei pra ve se faz alguma diferença
  // acho que isso ta fazendo um verificação inutil

  return (
    <>
      <UserContext.Provider value={user}>
        <PostProvider>
          <Outlet/>
          <NavBottom />
        </PostProvider>
      </UserContext.Provider>
    </>
  )
}

export default App

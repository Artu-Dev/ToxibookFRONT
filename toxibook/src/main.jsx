import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import "react-circular-progressbar/dist/styles.css";
import "./components/Layout/UserContainer/UserContainer.css"

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import PostDetails from './pages/Home/PostDetails/PostDetails.jsx'
import Login from './pages/Login/Login.jsx'
import Profile from './pages/Profile/Profile.jsx'
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import { AuthUserProvider } from './contexts/AuthUser.jsx'
import Signin from './pages/Signin/Signin.jsx';
import Terms from './pages/Terms/Terms.jsx';
import About from './pages/About/About.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home latest={false}/>
      },
      {
        path: "/latest",
        element: <Home latest={true}/>
      },
      {
        path: "/search",
        element: <SearchPage/>
      },
      {
        path: "/post/:id",
        element: <PostDetails/>
      },
      {
        path: "/profile/:id",
        element: <Profile replys={false}/>,
      },
      {
        path: "/profile/replys/:id",
        element: <Profile replys={true}/>
      },
    ]
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signin",
    element: <Signin/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthUserProvider>
        <RouterProvider router={router} />
    </AuthUserProvider>
  </React.StrictMode>,
)

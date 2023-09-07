import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import "./components/react-circular-progressbar/styles.css";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
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
        element: <Profile />
      },
      // {
      //   path: "/post/edit/:id",
      //   element: <Home/>
      // },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthUserProvider>
      <RouterProvider router={router} />
    </AuthUserProvider>
  </React.StrictMode>,
)

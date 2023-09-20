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
import { PostProvider } from './contexts/PostContext.jsx';

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
        element: <Profile replys={false}/>
      },
      {
        path: "/profile/replys/:id",
        element: <Profile replys={true}/>
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
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </AuthUserProvider>
  </React.StrictMode>,
)

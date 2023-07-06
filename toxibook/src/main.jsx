import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import PostDetails from './pages/Home/PostDetails/PostDetails.jsx'
import Login from './pages/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      // {
      //   path: "/trending",
      //   element: <Home/>
      // },
      // {
      //   path: "/profile/:id",
      //   element: <Home/>
      // },
      // {
      //   path: "/profile/edit/:id",
      //   element: <Home/>
      // },
      {
        path: "/post/:id",
        element: <PostDetails/>
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { router } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx';


import ReactDOM,{ createRoot } from 'react-dom/client'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'
// import Navbar from './components/Navbar/Navbar.jsx'
// import Register from './components/Register/Register.jsx'
// import Login from './components/Login/Login.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' >
//       <Route path ='' element={<Register />}> </Route>
//       <Route path = 'register' element={<Register />}></Route>
//       <Route path = 'login' element={<Login />}></Route>


//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    {/* <RouterProvider  router={router} /> */}
    <App />
    </AuthProvider>
  </StrictMode>,
)

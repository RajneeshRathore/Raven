import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/normal/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
const router=createBrowserRouter(
  createRoutesFromElements(<Route path='/'>
    <Route index  element={<HomePage/>}/>
    <Route index path='/login' element={<Login/>} />
    <Route index path='/register' element={<Register/>} />
  </Route>)
)
const App = () => {
  return <RouterProvider router={router} />
}

export default App

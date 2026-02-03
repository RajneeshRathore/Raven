import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/normal/NavBar'
const router=createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<NavBar/>}>
    <Route index  element={<HomePage/>}/>
  </Route>)
)
const App = () => {
  return <RouterProvider router={router} />
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Card from './component/Card/Card.jsx';
import AddMovie from './component/Add Movies/AddMovies.jsx';
import MovieDetails from './component/Details/MovieDetails.jsx';
import Login from './component/Login/Login.jsx';
import SignUp from './component/Signup/SignUp.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      < Route path='' element={<Card />} />
      < Route path='addmovie' element={<AddMovie />} />
      < Route path='moviedetails/:id' element={<MovieDetails />} />
      < Route path='login' element={<Login />} />
      < Route path='login/signup' element={<SignUp />} />

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </>,
)

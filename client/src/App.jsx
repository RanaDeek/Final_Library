import { useState } from 'react'
import './App.css'
import Root from './Pages/Route/Route';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';
import About from './Pages/About/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs'
import Student from './Pages/Student/Student';
import Book from './Pages/Book/Book';
import Category from './Pages/Category/Category';
import Students from './Pages/Students/Students';
import Lending from './Pages/Lending_Book/Lending';
import Fees from './Pages/Fees/Fees';

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/Profile', element: <Profile /> },
      { path: '/About', element: <About /> },
      { path: '/Student', element: <Student /> },
      { path: '/Book', element: <Book /> },
      { path: '/Category', element: <Category /> },
      { path: '/Students', element: <Students /> },
      { path: '/Lending', element: <Lending /> },
      { path: '/Fees', element: <Fees /> },
      { path: '*', element: <h1>Page not found</h1> }
    ]
  }]);


  return (
    <>
      <div>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>

    </>
  )
}

export default App

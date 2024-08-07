import React from 'react'
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer';
import { Outlet } from 'react-router-dom';
import './Route.css'



function root() {

  return (
    <>

      <div className='Component' >
        <Navbar />
        <div className='Height'>
          <Outlet />
        </div>
        <Footer />
      </div>


    </>
  )
}

export default root
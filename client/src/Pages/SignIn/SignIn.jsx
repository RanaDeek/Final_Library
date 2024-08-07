import React, { useState } from 'react'
import Books from '../../assets/6.png'
import './SignIn.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify'
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signin', data)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('Student', token);
        navigate('/');
        window.location.reload();
        setData({
          email: '',
          password: ''
        });

        toast('Success! Thank you for signing in.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        console.log('User signed in successfully:', response);
      })
      .catch(error => {
        console.error('Error signing in:', error);
        toast.error('Error signing in. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      });
  };

  return (
    <>
      <div className='SignIN'>
        <div className="overlays">
          <img src={Books} alt="" />
        </div>
        <div className="SignIn-container">
          <h2>Sign In</h2>
          <p>Don't Have an account ? <NavLink to="/SignUp">Sign Up</NavLink> </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Please Enter Your Mail' name="email" value={data.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Please Enter Your Password' value={data.password} name="password" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default SignIn



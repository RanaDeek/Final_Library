import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { toast, Zoom } from 'react-toastify'
import Books from '../../assets/6.png';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        schoolID: '',
        role: '',
        agreeTerms: false
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', formData)
            .then(response => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    schoolID: '',
                    role: '',
                    agreeTerms: false
                })
                toast('Success! Thank you for signing up.', {
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
                console.log('User signed up successfully:', response.data);
            })
            .catch(error => {
                console.error('Error signing up:', error);
                toast.error('Error signing up. Please try again.', {
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
            <div>
                <div className="overlays">
                    <img src={Books} alt="" />
                </div>
                <div className="SignIn-container UP">
                    <h2>Sign Up</h2>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="inputFName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                id='inputFName'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                aria-label="First name"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputLName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                id='inputLName'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                aria-label="Last name"
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                placeholder='Enter Your Email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                placeholder='Enter Your Password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputID" className="form-label">School ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputID"
                                placeholder='Enter Your School ID'
                                name='schoolID'
                                value={formData.schoolID}
                                onChange={handleChange}
                            />
                        </div>
                       
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;

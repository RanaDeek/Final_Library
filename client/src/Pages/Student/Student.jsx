import React, { useState } from 'react'
import './Student.css'
import { toast, Zoom } from 'react-toastify'
import axios from 'axios';

function Student() {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        current_class: '',
        schoolID: '',
        Fees: 50,
        Date:'',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(student)
        axios.post('http://localhost:5000/AddStudent', student)
            .then(response => {
                setStudent({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    current_class: '',
                    schoolID: '',
                    Fees: 50,
                    Date:'',
                })
                toast('Success Adding !!!', {
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
                console.log('added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding:', error);
                toast.error(`${error.response.data.message}. Please try again.`, {
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
            <div className='AddStudent-container '>
                <h2 className='studentH2'>Add Student</h2>
                <p className='studentH2'>Add New Students to Our Growing Community</p>
                <form className='shadow AddStudent' onSubmit={handleSubmit}>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input1" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input1" name='firstName' value={student.firstName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input2" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input2" value={student.lastName} name="lastName" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inpu3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input3" value={student.email} name="email" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input4" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input4" value={student.phone} name="phone" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input5" className="col-sm-2 col-form-label">Current Class</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input5" value={student.current_class} name="current_class" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input6" className="col-sm-2 col-form-label">School ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input6" value={student.schoolID} name="schoolID" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inpu7" className="col-sm-2 col-form-label">Fees</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="input7" value={student.Fees} name="Fees" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="input8" className="col-sm-2 col-form-label">Date OF Fees</label>
                        <div className="col-sm-10">
                            <input type="Date" className="form-control" id="input8" value={student.Date} name="Date" onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary ">Add</button>
                </form>
            </div>

        </>
    )
}

export default Student
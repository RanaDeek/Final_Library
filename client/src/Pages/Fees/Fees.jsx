import React, { useEffect, useState } from 'react';
import "./Fees.css";
import { toast, Zoom } from 'react-toastify';
import axios from 'axios';
import Books from '../../assets/6.png';

function Fees() {
    const [students, setStudents] = useState([]);
    const [updateFees, setupdate] = useState({
        Fees: 0,
        Student: '',
        Date: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdate({
            ...updateFees,
            [name]: value
        });
    };

    const getStudents = async () => {
        const response = await fetch('https://final-library-server.onrender.com/getStudent');
        const data = await response.json();
        setStudents(data.students);
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updateFees);

        try {
            const response = await axios.post('https://final-library-server.onrender.com/updateFees', updateFees);
            setupdate({
                Fees: 0,
                Student: '',
                Date: '',
            });
            toast('Success! Fees updated.', {
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
        } catch (error) {
            console.error('Error updating fees:', error);
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
        }
    };


    useEffect(() => {
        getStudents();
    }, []);

    return (
        <>
            <div>
                <div className="overlays">
                    <img src={Books} alt="" />
                </div>
                <div className="Fees-Container">
                    <h2>Update Fees System</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="select" className="form-label">Select Student</label>
                            <select
                                name="Student"
                                className="form-select"
                                id='select'
                                value={updateFees.Student}
                                onChange={handleChange}
                            >
                                <option value="">Select a Student</option>
                                {students.map(student => (
                                    <option key={student._id} value={student.name}>{student.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">New Fees</label>
                            <input
                                type="text"
                                name='Fees'
                                id='input'
                                value={updateFees.Fees}
                                onChange={handleChange}
                                placeholder='Today Date'
                                disabled={!updateFees.Student}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input2" className="form-label">Fees Date</label>
                            <input
                                type="Date"
                                name='Date'
                                id='input2'
                                value={updateFees.Date}
                                onChange={handleChange}
                                placeholder='Enter The New Fees'
                                disabled={!updateFees.Student}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Fees;

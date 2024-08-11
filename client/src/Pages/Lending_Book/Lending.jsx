import React, { useEffect, useState } from 'react';
import "./Lending.css";
import { toast, Zoom } from 'react-toastify';
import axios from 'axios';
import { IoIosWarning } from "react-icons/io";

function Lending() {
    const [borrowers, setBorrowers] = useState([]);
    const [newRow, setNewRow] = useState({
        Student: '',
        BookName: '',
        DateBorrowed: '',
        DateReturned: '',
        Comments: ''
    });
    const [showNewRowForm, setShowNewRowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedRow, setUpdatedRow] = useState({
        Student: '',
        BookName: '',
        DateReturned: ''
    });


    const isWarningNeeded = (dateBorrowed) => {
        const borrowDate = new Date(dateBorrowed);
        const currentDate = new Date();

        let Difference_In_Time =
            currentDate.getTime() - borrowDate.getTime();

        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return Difference_In_Time > oneWeek;
    };


    const handleNewRowChange = (e) => {
        const { name, value } = e.target;
        setNewRow({
            ...newRow,
            [name]: value
        });
    };

    const getBorrowers = async () => {
        try {
            const response = await fetch('https://final-library-server.onrender.com/borrowers');
            const data = await response.json();
            setBorrowers(data.borrowers || []);
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://final-library-server.onrender.com/newborrower', newRow)
            .then(response => {
                setBorrowers([...borrowers, response.data]);
                setNewRow({
                    Student: '',
                    BookName: '',
                    DateBorrowed: '',
                    DateReturned: '',
                    Comments: ''
                });
                setShowNewRowForm(false);
                toast('Success! Borrower added.', {
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
            })
            .catch(error => {
                console.error('Error adding borrower:', error.response.data.message);
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

    const handleAddRow = () => {
        setShowNewRowForm(true);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        const borrower = borrowers[index];
        setUpdatedRow({
            Student: borrower.Student,
            BookName: borrower.BookName,
            DateReturned: borrower.DateReturned || ''
        });
    };

    const handleUpdate = () => {
        axios.post('https://final-library-server.onrender.com/EditBookDate', updatedRow)
            .then(response => {
                const updatedBorrowers = borrowers.map((borrower, index) =>
                    index === editingIndex ? response.data : borrower
                );
                setBorrowers(updatedBorrowers);
                setEditingIndex(null);
                setUpdatedRow({
                    Student: '',
                    BookName: '',
                    DateReturned: ''
                });
                toast('Success! Borrower updated.', {
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
            })
            .catch(error => {
                console.error('Error updating borrower:', error);
                toast.error(`Error updating borrower: ${error.message}`, {
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

    useEffect(() => {
        getBorrowers();
    }, []);

    return (
        <div className='Lending-Container'>

            <div className='table-Lending'>
                <h1>Book Lending System</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={`Submit-Button ${(editingIndex !== null) ? 'margin' : ''} `} >
                            <button type="button" onClick={handleAddRow}>Add NewRow</button>
                            <button type="submit">Add Borrower</button>
                            {editingIndex !== null && (
                                <button type="button" onClick={handleUpdate}>Update Borrower</button>
                            )}
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Student</th>
                                    <th scope="col">Book Name</th>
                                    <th scope="col">Date Borrowed</th>
                                    <th scope="col">Date Returned</th>
                                    <th scope='col'>Comments</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowers.map((borrower, index) => (
                                    <tr key={index}>
                                        <td>{borrower.Student}</td>
                                        <td>{borrower.BookName}</td>
                                        <td>{borrower.DateBorrowed}</td>
                                        <td>{borrower.DateReturned}</td>
                                        <td>
                                            {isWarningNeeded(borrower.DateBorrowed) && (
                                                <span className="warning-icon"><IoIosWarning /> You need to call them</span>
                                            )}

                                        </td>
                                        <td>

                                            <button type="button" onClick={() => handleEdit(index)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                                {showNewRowForm && (
                                    <tr>
                                        <td><input type="text" name='Student' value={newRow.Student} onChange={handleNewRowChange} placeholder='Student Name' /></td>
                                        <td><input type="text" name='BookName' value={newRow.BookName} onChange={handleNewRowChange} placeholder='Book Name' /></td>
                                        <td><input type="Date" name='DateBorrowed' value={newRow.DateBorrowed} onChange={handleNewRowChange} placeholder='Date Borrowed' /></td>
                                        <td><input type="Date" name='DateReturned' value={newRow.DateReturned} onChange={handleNewRowChange} placeholder='Date Returned' /></td>
                                        <td><input type="text" name='Comments' value={newRow.Comments} onChange={handleNewRowChange} placeholder='Comments' /></td>
                                    </tr>
                                )}
                                {editingIndex !== null && (
                                    <tr>
                                        <td>{updatedRow.Student}</td>
                                        <td>{updatedRow.BookName}</td>
                                        <td>{updatedRow.DateBorrowed}</td>
                                        <td><input type="text" name='DateReturned' value={updatedRow.DateReturned} onChange={e => setUpdatedRow({ ...updatedRow, DateReturned: e.target.value })} /></td>
                                        <td>{updatedRow.Comments}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Lending;

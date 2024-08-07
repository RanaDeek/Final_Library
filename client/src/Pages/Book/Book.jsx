import React, { useState } from 'react'
import './Book.css'
import { FcDepartment } from 'react-icons/fc'
import axios from 'axios';
import { toast, Zoom } from 'react-toastify'

function Book() {
    const [bookData, setBookData] = useState({
        title: '',
        id: '',
        author: '',
        quantity: 0,
        edition: 0,
        category: '',
        Status:'',
    })
    const handlechange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setBookData({
            ...bookData,
            [name]: files[0]
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookData);
        axios.post('http://localhost:5000/AddBook', bookData)
            .then(response => {
                setBookData({
                    title: '',
                    id: '',
                    author: '',
                    quantity: 0,
                    edition: 0,
                    category: '',
                    Status:'',
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
                toast.error('Error Adding Student . Please try again.', {
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
                <h2 className='studentH2'>Add Book</h2>
                <p className='studentH2'>Add New Students to Discover Our Collection</p>
                <form className='shadow AddStudent' onSubmit={handleSubmit}>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inputEmail1" className="col-sm-2 col-form-label">Book Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputEmail1" name='title' value={bookData.title} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inputPassword2" className="col-sm-2 col-form-label">Book ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword2" name='id' value={bookData.id} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Author Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputEmail3" name='author' value={bookData.author} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inputPassword4" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword4" name='quantity' value={bookData.quantity} onChange={handlechange} />
                        </div>
                    </div>

                    <div className="row mb-3 student-row">
                        <label htmlFor="inputEmail5" className="col-sm-2 col-form-label">Edition</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputEmail5" name='edition' value={bookData.edition} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="row mb-3 student-row">
                        <label htmlFor="inputEmail6" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputEmail6" name='Status' value={bookData.Status} onChange={handlechange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inputPassword7" className="col-sm-2 col-form-label">Category</label>
                        <select className="form-select select-book" aria-label="Default select example" id="inputPassword7" name='category' value={bookData.category} onChange={handlechange}>
                            <option selected>Select Category</option>
                            <option value="Literature">Literature</option>
                            <option value="History">History</option>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Economics">Economics</option>
                            <option value="Philosophy">Philosophy</option>
                            <option value="Geography">Political Science</option>
                            <option value="Business">Computer Science</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary padding-book">Add </button>
                </form>
            </div>

        </>)
}

export default Book
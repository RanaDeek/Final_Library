import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import "./Category.css"
import Library from '../../assets/books1.png'
import { NavLink } from 'react-router-dom';
function Category() {
  const [books, setbooks] = useState([])
  const [password, setpassword] = useState("");
  const [userToken, setUserToken] = useState(localStorage.getItem('Student'));
  const getData = () => {
    if (userToken) {
      const decoded = jwtDecode(userToken);
      setpassword(decoded.password);
    }
  }
  const getCategory = async () => {
    const response = await fetch('http://localhost:5000/getBooks')
    const data = await response.json()
    setbooks(data.books)
  }
  useEffect(() => {
    getCategory()
  },[])
  return (
    <>
      <div>
        <div className='Overlay '>

        </div>
        <div className='table-container'>
          <h1>Categories</h1>
          <p>Explore your favorite books 📚</p>
          <NavLink to='/Book'>Add Book</NavLink>
          <div className='table-width'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Edition</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr>
                    <th scope="row"><FaBook /></th>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.edition}</td>
                    <td>{book.Category}</td>
                    <td>{book.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </>


  )
}

export default Category
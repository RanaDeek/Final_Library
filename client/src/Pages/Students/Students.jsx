import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

function Students() {
  const [students, setStudents] = useState([])

  const getStudents = async () => {
    const response = await fetch('http://localhost:5000/getStudent')
    const data = await response.json()
    setStudents(data.students)
  }
  useEffect(() => {
    getStudents()
  }, [])
  return (
    <>
      <div>
        <div className='Overlay '>

        </div>
        <div className='table-container'>
          <h1>Students</h1>
          <p>See which books our students are borrowing 📚</p>
          <NavLink to='/Student'>Add Student</NavLink>
          <div className='table-width'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Class</th>
                  <th scope="col">School ID </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr>
                    <th scope="row"> <CgProfile /></th>
                    <td>{student.name}</td>
                    <td>{student.Email}</td>
                    <td>{student.phone}</td>
                    <td>{student.current_class}</td>
                    <td>{student.schoolID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </>)
}

export default Students
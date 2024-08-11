import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import "./Students.css";
import { IoIosWarning } from "react-icons/io";

function Students() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const response = await fetch('https://final-library-server.onrender.com/getStudent');
    const data = await response.json();
    setStudents(data.students);
  };

  const isWarningNeeded = (FeesDate) => {
    const dateBorrowed = new Date(FeesDate);
    const currentDate = new Date();

    let Difference_In_Time =
      currentDate.getTime() - dateBorrowed.getTime();
    console.log(Difference_In_Time);

    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    return Difference_In_Time > oneMonth;
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div>
        <div className='Overlay '></div>
        <div className='table-container'>
          <h1>Students</h1>
          <p>See which books our students are borrowing 📚</p>
          <div className='nav-button'>
            <NavLink className="Nav-link" to='/Student'>Add Student</NavLink>
            <NavLink className="Nav-link" to='/Fees'>Update Fees</NavLink>
          </div>
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
                  <th scope="col">Fees</th>
                  <th scope="col">Date Of Fees</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <th scope="row"><CgProfile /></th>
                    <td>{student.name}</td>
                    <td>{student.Email}</td>
                    <td>{student.phone}</td>
                    <td>{student.current_class}</td>
                    <td>{student.schoolID}</td>
                    <td>{!student.Fees ? '0$' : `${student.Fees}`}</td>
                    <td>{new Date(student.Date).toLocaleDateString()}</td>
                    <td>
                      {isWarningNeeded(student.Date) && (
                        <span className="warning-icon"><IoIosWarning /> You need to call them</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;

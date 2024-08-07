import React, { useEffect, useState } from 'react'
import Books from '../../assets/7.jpg'
import logo from '../../assets/pngegg (15).png'
import './Profile.css'
import { jwtDecode } from "jwt-decode";

function Profile() {
    const [studentName, setName] = useState("");
    const [studentEmail, setEmail] = useState("");
    const [studentID, setID] = useState("");
    const [role, setRole] = useState("");
    const [userToken, setUserToken] = useState(localStorage.getItem('Student'));
    const getData = () => {
        if (userToken) {
            const decoded = jwtDecode(userToken);
            setName(decoded.name);
            setEmail(decoded.Email);
            setID(decoded.schoolID);
            setRole(decoded.role);
        }
    }
    const [quote, setquote] = useState("")
    const quotes = [
        "Be yourself; everyone else is already taken. -Oscar Wilde",
        "So many books, so little time. -Frank Zappa",
        "A room without books is like a body without a soul. -Marcus Tullius",
        "You only live once, but if you do it right, once is enough. -Mae West",
        "Be the change that you wish to see in the world, -Mahatma Gandhi",
        "We accept the love we think we deserve, -Stephen Chbosky"];

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setquote(quotes[randomIndex]);
    }

    useEffect(() => {
        getRandomQuote();
        getData();
    })

    return (
        <>
            <div className='profile'>
                <div className='Overlay'>

                </div>
                <div className='Top-profile'>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <div className='Description'>
                        <div className='Name'>
                            <h2>{studentName}</h2>
                            <p>{role}</p>
                        </div>
                        <div className='Second'>
                            <p>Email: <span>{studentEmail}</span></p>
                            <p>ID: <span>{studentID}</span></p>
                            <h4>Books Borrowed By You</h4>
                            <ul>
                                <li>Rana</li>
                                <li>Reem</li>
                                <li>Sara</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile
import React from 'react';
import './About.css';
import Book from '../../assets/6.jpg';
import Books from '../../assets/3.avif';
import Shelf from '../../assets/book.jpg';

function About() {
    return (
        <div className="about-container ">
            <div className='columns'>
                <div className="coll">
                    <img src={Book} alt="Book" className="about-image" />
                </div>
                <div className="col about-text-container">
                    <div className="about-text">
                        <h3>Don't Compromise</h3>
                        <p>Your values and principles for temporary convenience or fleeting success; stay true to yourself and what you believe in</p>
                    </div>
                </div>
            </div>
            <div className='columns'>
                <div className="col about-text-container">
                    <div className="about-text">
                        <h3>Your Success is Our Priority</h3>
                        <p>
                            We are dedicated to providing the support and resources you need to achieve your goals and excel in every endeavor.
                        </p>
                    </div>
                </div>
                <div className="coll">
                    <img src={Books} alt="Books" className="about-image" />
                </div>

            </div>
            <div className='columns'>
                <div className="coll">
                    <img src={Shelf} alt="Shelf" className="about-image" />
                </div>
                <div className="col about-text-container">
                    <div className="about-text">
                        <h3>Stay Foucesd</h3>
                        <p>Maintaining concentration and dedication will help you overcome obstacles and achieve success.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;

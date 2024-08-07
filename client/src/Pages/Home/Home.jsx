import React from 'react';
import './Home.css';
import Group from '../../assets/1.avif';
import Books from '../../assets/book (3).jpg';
import Man_Women from '../../assets/Man-Women.jpg';
import { BsSearch } from "react-icons/bs";

function Home() {
  return (
    <>
      <div className='overlay'>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={Man_Women} className="d-block w-100" alt="Man and Woman" />
            </div>
            <div className="carousel-item" data-bs-interval="1000">
              <img src={Books} className="d-block w-100" alt="Books" />
            </div>
            <div className="carousel-item" data-bs-interval="1000">
              <img src={Group} className="d-block w-100" alt="Group" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="bookstore-container">
          <div className="header">
            <h1 className="title">Birzeit Library</h1>
            <div className="subtitle-container">
              <div className="line">
                <hr className='narrow-margin' />
                <hr className='narrow-margin' />
              </div>
              <h2 className="subtitle">Discover Our Collection</h2>
              <div className="line">
                <hr className='narrow-margin' />
                <hr className='narrow-margin' />
              </div>
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Your Book Title Here" />
            <button>
              <BsSearch className='Search-Icon' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import './Footer.css'
function Footer() {
  return (
    <>
      <footer className="bg-body-tertiary text-center footer-wid">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button"><FaFacebook/></a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button"><FaTwitter/></a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button"><FaGoogle/></a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button"><SlSocialInstagram /></a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button"><CiLinkedin/></a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#333333' }} href="#!" role="button"><FaGithub/></a>
          </section>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2020 Copyright:
          <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>

    </>
  )
}

export default Footer
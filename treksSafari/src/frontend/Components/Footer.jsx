import React, {useEffect} from 'react'
import './Components.css'

//imported Icons
import {HiPhone} from 'react-icons/hi'
import {MdEmail} from 'react-icons/md'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiOutlineWhatsApp} from 'react-icons/ai'


const Footer = () => {

  return (
    <div className='footer'>

      <div className="secContainer container">
        <div className="content grid">

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
            <div className="spanText">
              CONTACT US
            </div>

            <div className="contactDiv">
              <span className="flex">
                <HiPhone className='icon'/>
                <span>+639 334 556 671</span>
              </span>
              <span className="flex">
                <MdEmail className='icon'/>
                <span>trekssafari@gmail.com</span>
              </span>
              <span className="flex">
                <AiOutlineWhatsApp className='icon'/>
                <span>+639 334 556 671</span>
              </span>
            </div>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
            <div className="spanText">
            POPULAR NEWS
            </div>

            <div className="singleNews">
              <span className="text">
              Your Personal Guide to the hiking places in the Philippines
              </span>
              <p>
                August 01, 2024
              </p>
            </div>

            <div className="singleNews">
              <span className="text">
              With ForeverHiking, you will be treated like family. 
              Your safety and enjoyment is our primary mission.<br/> 
              We are excited to meet you!
              </span>
              <p>
                August 01, 2024
              </p>
            </div>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
             <div className="spanText">
              QUICK LINKS
             </div>
             <div className="footerLinks">
              <ul>
                <li>About Us</li>
                <li>Our Team</li>
                <li>Gallery</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
             </div>
          </div>

        </div>
        <div  className="bottomDiv flex">
          <p >TreksSafari 2024 - All rights reserved</p>

          <div className="social flex">
            <FaFacebookF className='icon'/>
            <AiOutlineTwitter className='icon'/>
            <AiFillYoutube className='icon'/>
            <AiFillInstagram className='icon'/>
          </div>

          <a className='staffLogin' href="/staffLogin">Treks Safari Dashboard</a>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
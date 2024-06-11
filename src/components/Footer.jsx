import React from 'react';
import styles from '/src/css/Footer.module.css';
import textLogo from '/src/assets/textLogo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className="container">
        <hr />
        <div className="row mb-5">
          <div className="col-md-3">
            <p className='fst-italic'>HELP</p>
            <ul>
              <li>You can <a href="tel:your-phone-number"><u>call</u></a> or <a href="mailto:your-email@example.com"><u>email us</u>.</a></li>
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Product Care</a></li>
              <li><a href="#">Stores</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <p className='fst-italic'>SERVICES</p>
            <ul>
              <li><a href="#">Repairs</a></li>
              <li><a href="#">Personalization</a></li>
              <li><a href="#">Art of Gifting</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <p className='fst-italic'>ABOUT BIJOUX</p>
            <ul>
              <li><a href="#">Fashion Show</a></li>
              <li><a href="#">Arts & Culture</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Latest News</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Foundation Bijoux</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <p className='fst-italic'>EMAIL SIGN-UP</p>
            <ul>
              <li><a href="#"><u>Sign up</u></a> for Bijoux emails and receive the latest news from the Maison, including exclusive online pre-launches and new collections</li>
              <li>Follow Us</li>
              <li><Link to="#"><i className="fab fa-facebook-f"></i> Facebook</Link></li>
              <li><Link to="#"><i className="fab fa-linkedin-in"></i> LinkedIn</Link></li>
              <li><Link to="#"><i className="fab fa-youtube"></i> YouTube</Link></li>
              <li><Link to="#"><i className="fab fa-instagram"></i> Instagram</Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className={`text-center mt-5 ${styles.textCenter}`}>
          <p className='fw-semibold'><i>&copy; 2024 Bijoux Inc.</i></p>

          <img src={textLogo} alt="Text Logo" style={{ width: '70vw', height: 'auto' }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

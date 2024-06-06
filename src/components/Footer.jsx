import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const footerStyles = {
  footer: {
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '40px 0',
    fontFamily: 'Arial, sans-serif',
  },
  h5: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '20px',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  li: {
    marginBottom: '10px',
  },
  a: {
    color: '#d1d1d1',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  socialIcons: {
    marginRight: '15px',
    color: '#d1d1d1',
    fontSize: '18px',
    transition: 'color 0.3s ease',
  },
  textCenter: {
    color: '#d1d1d1',
    margin: '20px 0 0',
  },
};

const Footer = () => {
  return (
    <footer style={footerStyles.footer} className="footer mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5 style={footerStyles.h5}>Why La Bijoux</h5>
            <ul style={footerStyles.ul}>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Returns Are Free</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Conflict Free Diamonds</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Diamond Price Matching</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Diamond Upgrade Program</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Free Lifetime Warranty</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Material Price List</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Diamond Price List</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Jewelry Insurance</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 style={footerStyles.h5}>Diamond Shapes</h5>
            <ul style={footerStyles.ul}>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Round</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Princess</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Cushion</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Oval</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Emerald</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Pear</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Asscher</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Heart</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Radiant</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Marquise</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 style={footerStyles.h5}>About Red Nile</h5>
            <ul style={footerStyles.ul}>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Quality & Value</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Diamond Sustainability</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Locations</Link></li>
              <li style={footerStyles.li}><Link to="#" style={footerStyles.a}>Careers</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 style={footerStyles.h5}>Connect with Us</h5>
            <ul style={footerStyles.ul} className="social-icons">
              <li style={footerStyles.li}><Link to="#"><i className="fab fa-facebook-f" style={footerStyles.socialIcons}></i> Facebook</Link></li>
              <li style={footerStyles.li}><Link to="#"><i className="fab fa-linkedin-in" style={footerStyles.socialIcons}></i> LinkedIn</Link></li>
              <li style={footerStyles.li}><Link to="#"><i className="fab fa-youtube" style={footerStyles.socialIcons}></i> YouTube</Link></li>
              <li style={footerStyles.li}><Link to="#"><i className="fab fa-instagram" style={footerStyles.socialIcons}></i> Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4" style={footerStyles.textCenter}>
          <p>&copy; 2024 Red Nile Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import '../../sass/components/Footer.scss';
import Logo from '../Images/logo.png';
import { Link } from "react-router-dom";

function Footer() {

  return (
    <div className="footer flex-even">
      <img src={Logo} className="circle" alt="logo" />
      <div className="footer-links">
        <ul className="footer-list flex-even">
          <li className="blog">
            <a
              href="https://hive.blog/@inkito"
              target="_blank"
              rel="noopener noreferrer"
              title="Inkito blog"
              >
              Blog
            </a>
          </li>
          <li className="comics">
            <Link to="/comics">
              Comics
            </Link>
          </li>
          <li className="novels">
            <Link to="/novels">
              Novels
            </Link>
          </li>
          <li className="faq-link">
            <Link to="/faq">
              F.A.Q.
            </Link>
          </li>
          <li className="tos">
            <Link to="/terms">
              Terms of services
            </Link>
          </li>
          <li className="privacy-link">
            <Link to="/privacy">
              Privacy policy
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex row wrap pa-h">   
        <p> Credits:</p>
        <a href="https://www.freepik.com/free-photos-vectors/business">Illustrations created by pikisuperstar - www.freepik.com</a>
      </div>
      {/*<div className="social">
        <a
          href="https://hive.blog/@inkito"
          target="_blank"
          rel="noopener noreferrer">
          App Social Media
          </a>
  </div>*/}
    </div>
  );
}

export default Footer;
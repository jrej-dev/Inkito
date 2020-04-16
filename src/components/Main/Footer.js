import React from 'react';
import '../../sass/components/Footer.scss';

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer flex-even">
      <div className="circle" />
      <div className="footer-links">
        <ul className="footer-list flex-even">
          <li className="blog">
            <a
              href="https://hive.blog/@inkito"
              target="_blank"
              rel="noopener noreferrer">
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
          <li className="faq">F.A.Q.</li>
          <li className="tos">Terms of services</li>
          <li className="privacy">Privacy policy</li>
        </ul>
      </div>
      <div className="social">App Social Media</div>
    </div>
  );
}

export default Footer;
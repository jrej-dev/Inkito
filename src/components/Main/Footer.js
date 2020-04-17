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
          <li className="faq">
            <a
              href="https://hive.blog/faq.html"
              target="_blank"
              rel="noopener noreferrer">
              F.A.Q.
            </a>
          </li>
          <li className="tos">
            <a
              href="https://wallet.hive.blog/tos.html"
              target="_blank"
              rel="noopener noreferrer">
              Terms of services
            </a>
          </li>
          <li className="privacy">
            <a
              href="https://hive.blog/privacy.html"
              target="_blank"
              rel="noopener noreferrer">
              Privacy policy
            </a>
          </li>
        </ul>
      </div>
      <div className="social">
        <a
          href="https://hive.blog/@inkito"
          target="_blank"
          rel="noopener noreferrer">
          App Social Media
          </a>
      </div>
    </div>
  );
}

export default Footer;
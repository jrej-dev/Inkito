import React from 'react';
import '../../sass/components/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="circle"/>
      <div className="footer-links">
        <ul className="footer-list">
          <li className="blog">Blog</li>
          <li className="comics">Comics</li>
          <li className="novels">Novels</li>
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
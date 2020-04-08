import React from 'react';
import 'wired-elements';
import '../../sass/components/NavReader.scss';

import LeftArrow from '../../icons/left-arrow.png';
import RightArrow from '../../icons/right-arrow.png';
import Heart from '../../icons/heart.png';
import Bubble from '../../icons/bubble.png';
import Bell from '../../icons/bell.png';

import { Link } from "react-router-dom";

const NavReader = ({ page, title, length, onClick }) => {

  return (
    <div className="nav-reader">
      <ul className="nav-reader-list">
        <li className="title">
          <h1>
            <Link to="/">Inkito</Link>
          </h1>
        </li>
        <li className="flex arrows ">
          <div className={page === 1 ? "disabled flex previous" : "flex previous"} onClick={page === 1 ? null : onClick}>
            <img className="icon left-arrow" src={LeftArrow} alt="left-arrow"/>
            <p className="left-arrow">Previous</p>
          </div>
          <div className={page === length ? "disabled flex next" : "flex next"} onClick={page === length ? null : onClick}>
            <p className="right-arrow">Next</p>
            <img className="icon right-arrow" src={RightArrow} alt="right-arrow"/>
          </div>
        </li>
        <li className="post-title">
          {title}
        </li>
        <li className="flex icons">
          <img className="icon heart" src={Heart} alt="heart" onClick={onClick}/>
          <img className="icon comment" src={Bubble} alt="comment bubble" onClick={onClick}/>
          <img className="icon follow" src={Bell} alt="follow bell" onClick={onClick}/>
        </li>
        <li className="login" onClick={onClick}>Login/Register</li>
      </ul>
    </div>
  );
}

export default NavReader;
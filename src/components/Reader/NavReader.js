import React from 'react';
import 'wired-elements';
import '../../sass/components/NavReader.scss';

import LeftArrow from '../../icons/left-arrow.png';
import RightArrow from '../../icons/right-arrow.png';
import Heart from '../../icons/heart.png';
import Bubble from '../../icons/bubble.png';
import Bell from '../../icons/bell.png';
import DownArrow from '../../icons/down-arrow.png';

import { Link } from "react-router-dom";

function NavReader() {
  return (
    <div className="nav-reader">
      <ul className="nav-reader-list">
        <li>
          <h1>
            <Link to="/">Inkito</Link>
          </h1>
        </li>
        <li className="flex arrows">
          <div className="flex previous">
            <img className="icon left-arrow" src={LeftArrow} alt="left-arrow"/>
            <p>Previous</p>
          </div>
          <div className="flex next">
            <p>Next</p>
            <img className="icon right-arrow" src={RightArrow} alt="right-arrow"/>
          </div>
        </li>
        <li>
          <p>
            Series Name - Episode Number
          </p>
        </li>
        <li className="flex icons">
          <img className="icon heart" src={Heart} alt="heart"/>
          <img className="icon comment" src={Bubble} alt="comment bubble"/>
          <img className="icon follow" src={Bell} alt="follow bell"/>
        </li>
        <li>Login/Register</li>
      </ul>
    </div>
  );
}

export default NavReader;
import React from 'react';
import 'wired-elements';
import '../../sass/components/NavReader.scss';

import LeftArrow from '../../icons/left-arrow.png';
import RightArrow from '../../icons/right-arrow.png';
import Heart from '../../icons/heart.png';
import Bubble from '../../icons/bubble.png';
import Bell from '../../icons/bell.png';

import { Link } from "react-router-dom";

const NavReader = ({ page, content, length, onClick }) => {
  if (content) {
    return (
      <div className="nav-reader">
        <ul className="nav-reader-list">

          <li className="title flex">
            <h1>
              <Link to="/">Inkito</Link>
            </h1>
          </li>

          <li className="flex arrows ">
            <img className="icon first-arrow" src={LeftArrow} alt="first-arrow" onClick={onClick}/>
            <div className={page === 0 ? "disabled flex previous" : "flex previous"} onClick={page === 0 ? null : onClick}>
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow"/>
              <p className="left-arrow">Previous</p>
            </div>
            <div className="flex episode-number">
              <p className="episode">{page === 0 ? "" : "Episode"}</p>
              <p>{page === 0 ? "Cover" : page }</p>
            </div>
            <div className={page === length - 1 ? "disabled flex next" : "flex next"} onClick={page === length - 1 ? null : onClick}>
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow"/>
            </div>
            <img className="icon last-arrow" src={RightArrow} alt="last-arrow" onClick={onClick}/>
          </li>

          <li className="flex post-title">
            <p>
              {content[page] ? content[page].title.includes(content[0].title) ? "" : `${content[0].title} /` : ""}
            </p>
            <p>
              {content[page] ? content[page].title : ""}
            </p>
          </li>

          <li className="flex icons">
            <img className="icon heart" src={Heart} alt="heart" onClick={onClick}/>
            <img className="icon comment" src={Bubble} alt="comment bubble" onClick={onClick}/>
            <img className="icon follow" src={Bell} alt="follow bell" onClick={onClick}/>
          </li>

          <li className="login" onClick={onClick}>Login/Register</li>

        </ul>
      </div>
    )
  } else { 
    return (
      <div className="nav-reader">
        <ul className="nav-reader-list">
          <li className="title">
            <h1>
              <Link to="/">Inkito</Link>
            </h1>
          </li>
          <li className="flex arrows ">
            <div className="disabled flex previous" >
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow"/>
              <p className="left-arrow">Previous</p>
            </div>
            <div className="disabled flex next">
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow"/>
            </div>
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
}

export default NavReader;
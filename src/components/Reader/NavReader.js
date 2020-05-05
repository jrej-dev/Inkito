import React from 'react';
//import 'wired-elements';
import '../../sass/components/NavReader.scss';
import BellElement from './BellElement';
import HeartElement from './HeartElement';
import NavMenu from '../Main/NavMenu';
import ShareMenu from './ShareMenu';
import LeftArrow from '../Icons/left-arrow.png';
import RightArrow from '../Icons/right-arrow.png';
import Heart from '../Icons/grey-heart.png';
import Bell from '../Icons/bell.png';

import { Link } from "react-router-dom";

const NavReader = ({ firstPage, currentPage, lastPage, page, seriesLength, onClick, isHidden, shareIsActive, userDetail, seriesInfo, navMenuIsActive, followState, voteState}) => {
  if (firstPage && currentPage) {
    let image = JSON.parse(currentPage.json_metadata).image;
    return (
      <div className={isHidden ? "nav-reader hidden-top" : "nav-reader"}>
        <ul className="nav-reader-list">

          <li className="title flex">
            <h1>
              <Link to="/">Inkito</Link>
            </h1>
          </li>

          <li className="flex arrows ">
            <img className="icon first-arrow" src={LeftArrow} alt="first-arrow" onClick={onClick} />
            <div className={page === 0 ? "disabled flex previous" : "flex previous"} onClick={page === 0 ? null : onClick}>
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow" />
              <p className="left-arrow">Previous</p>
            </div>
            <div className="flex episode-number">
              <p className={page === 0 ? "episode hidden" : "episode"}>Episode</p>
              <p>{page === 0 ? "Cover" : page}</p>
            </div>
            <div className={page === seriesLength - 1 ? "disabled flex next" : "flex next"} onClick={page === seriesLength - 1 ? null : onClick}>
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow" />
            </div>
            <img className="icon last-arrow" src={RightArrow} alt="last-arrow" onClick={onClick} />
          </li>

          <li className="flex post-title">
            <p>
              {currentPage ? currentPage.title.includes(firstPage.title) ? "" : `${firstPage.title} /` : ""}
            </p>
            <p>
              {currentPage ? currentPage.title : ""}
            </p>
          </li>

          <li className="flex icons">
            {lastPage ? <HeartElement content={lastPage} page={seriesLength - 1} userDetail={userDetail} voteState={voteState} className="heartElement" /> : <img src={Heart} className="heart icon" alt="heart" />}
            {image ? <ShareMenu image={image[0]} shareIsActive={shareIsActive}/> : <ShareMenu shareIsActive={shareIsActive}/>}
            <BellElement className="bellElement" userDetail={userDetail} seriesInfo={seriesInfo} followState={followState}/>
          </li>
          <NavMenu navMenuIsActive={navMenuIsActive} userDetail={userDetail}/>
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
          <li className="flex arrows pa-h">
            <div className="disabled flex previous" >
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow" />
              <p className="left-arrow">Previous</p>
            </div>
            <div className="disabled flex next">
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow" />
            </div>
          </li>
          <li className="flex icons">
            <img className="icon heart" src={Heart} alt="heart" />
            <ShareMenu />
            <img className="icon follow" src={Bell} alt="follow bell" />
          </li>
          <NavMenu />
        </ul>
      </div>
    );
  }
}

export default NavReader;
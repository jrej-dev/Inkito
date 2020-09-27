import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import BellElement from '../../bellelement/bellelement';
import HeartElement from '../../heartelement/heartelement';
import NavMenu from '../menu/navmenu';
import ShareMenu from '../../sharemenu/sharemenu';
import LeftArrow from '../../../assets/icons/left-arrow.png';
import RightArrow from '../../../assets/icons/right-arrow.png';
import Heart from '../../../assets/icons/grey-heart.png';
import Bell from '../../../assets/icons/bell.png';

import './navreader.scss';

const NavReader = ({ firstPage, currentPage, lastPage, page, seriesLength, onClick, isHidden, shareIsActive, userDetail, seriesInfo, navMenuIsActive, followState, voteState}) => {
  useEffect (() => { 
    return () => dispose();
  })

  const dispose = () => {
    Menu = () => { "" };
  }

  let Menu = () => {
    return <NavMenu navMenuIsActive={navMenuIsActive} user={userDetail}/>
  }
  
  if (firstPage && currentPage) {
    let image = JSON.parse(currentPage.json_metadata).image;
    return (
      <div className={isHidden ? "nav-reader hidden-top" : "nav-reader"}>
        <ul className="nav-reader-list">

          <li className="title flex">
            <h1>
              <Link to="/">Inkito</Link>
            </h1>
            <p className="beta">Alpha</p>
          </li>

          <li className="flex arrows">
            <button className="hide first-arrow" onClick={onClick}>
              <img className="icon first-arrow" src={LeftArrow} alt="first-arrow"/>
            </button>
            <button className={page === 0 ? "disabled flex previous hide left-arrow" : "flex previous hide left-arrow"} onClick={page === 0 ? null : onClick}>
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow" />
              <p className="left-arrow">Previous</p>
            </button>
            <div className="flex episode-number">
              <p className={page === 0 ? "episode hidden" : "episode"}>Episode</p>
              <p>{page === 0 ? "Cover" : page}</p>
            </div>
            <button className={page === seriesLength - 1 ? "disabled flex next hide right-arrow" : "flex next hide right-arrow"} onClick={page === seriesLength - 1 ? null : onClick}>
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow" />
            </button>
            <button className="hide last-arrow" onClick={onClick}>
              <img className="icon last-arrow" src={RightArrow} alt="last-arrow"/>
            </button>
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
          <Menu />
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
            <button className="disabled flex previous hide" >
              <img className="icon left-arrow" src={LeftArrow} alt="left-arrow" />
              <p className="left-arrow">Previous</p>
            </button>
            <button className="disabled flex next hide">
              <p className="right-arrow">Next</p>
              <img className="icon right-arrow" src={RightArrow} alt="right-arrow" />
            </button>
          </li>
          <li className="flex icons">
            <button className="hide">
              <img className="icon heart" src={Heart} alt="heart" />
            </button>
            <ShareMenu />
            <button className="hide">
              <img className="icon follow" src={Bell} alt="follow bell" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavReader;
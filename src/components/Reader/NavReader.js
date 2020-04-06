import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import 'wired-elements';
import '../../sass/components/NavReader.scss';

import LeftArrow from '../../icons/left-arrow.png';
import RightArrow from '../../icons/right-arrow.png';
import Heart from '../../icons/heart.png';
import Bubble from '../../icons/bubble.png';
import Bell from '../../icons/bell.png';

import { Link } from "react-router-dom";

function NavReader() {
  const store = React.useContext(StoreContext);

  const PostTitle = () => {
    return useObserver(() => {
      if (typeof store.postTitle === "string"){
        return store.postTitle;
      } else {
        return ""
      }
    })
  }
  return (
    <div className="nav-reader">
      <ul className="nav-reader-list">
        <li className="title">
          <h1>
            <Link to="/">Inkito</Link>
          </h1>
        </li>
        <li className="flex arrows ">
          <div className="flex previous">
            <img className="icon left-arrow" src={LeftArrow} alt="left-arrow"/>
            <p>Previous</p>
          </div>
          <div className="flex next">
            <p>Next</p>
            <img className="icon right-arrow" src={RightArrow} alt="right-arrow"/>
          </div>
        </li>
        <li className="post-title">
          <p>
            <PostTitle />
          </p>
        </li>
        <li className="flex icons">
          <img className="icon heart" src={Heart} alt="heart"/>
          <img className="icon comment" src={Bubble} alt="comment bubble"/>
          <img className="icon follow" src={Bell} alt="follow bell"/>
        </li>
        <li className="login">Login/Register</li>
      </ul>
    </div>
  );
}

export default NavReader;
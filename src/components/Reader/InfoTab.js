import React from 'react';
/*import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import ReactMarkdown from 'react-markdown/with-html';*/
import 'wired-elements';
import '../../sass/components/InfoTab.scss';

/*import LeftArrow from '../../icons/left-arrow.png';
import RightArrow from '../../icons/right-arrow.png';*/
import Heart from '../../icons/heart.png';
import DownArrow from '../../icons/down-arrow.png';
import UpArrow from '../../icons/up-arrow.png';
import Clock from '../../icons/clock.png';
/*import Flag from '../../icons/flag.png';
import Bubble from '../../icons/bubble.png';
import Bell from '../../icons/bell.png';
import { Link } from "react-router-dom";*/

import CommentBlock from './CommentBlock';
import ContentBody from './ContentBody';

const InfoTab = ({ author }) => {

  const CommentList = (author) => {
    return (
      /*commentarray.map(comment => {
        return (
          <li>
            <CommentBlock />
          </li>
        )
      })*/
      <CommentBlock author={author}/>
    )
  }

  return (
    <div className="info-tab">
      <wired-card>
        <div className="info-card">
          <div className="default-banner flex">
            <img className="none active icon up-arrow" src={UpArrow} alt="up-arrow"/>
            <img className="none icon down-arrow" src={DownArrow} alt="down-arrow"/>
            <p>$ 1.22</p>
            <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
            <p>122 votes</p>
            <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
            <img className="icon clock" src={Clock} alt="clock"/>
            <p>7 days ago</p>
            <img className="icon heart" src={Heart} alt="heart"/>
          </div>
          <div className="none active">
            <div className="info-banner">
              
              <div className="author-info">
                <img className="panel-profile-pic"src={`https://steemitimages.com/u/${author}/avatar`} alt=" "/>
                <div className="author-name">
                  <p>Name {author}</p>
                  <p>Creator</p>
                </div>
              </div>

              <div className="content-info">
                <wired-card>                
                  <ContentBody />
                </wired-card>
              </div>
              
            </div> 
          </div>
          <ul>
            <CommentList />
          </ul>
        </div>
      </wired-card>
    </div>
  );
}

export default InfoTab;

import React from 'react';

/*import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import ReactMarkdown from 'react-markdown/with-html';*/
import 'wired-elements';
import '../../sass/components/InfoTab.scss';

/*import LeftArrow from '../Icons/left-arrow.png';
import RightArrow from '../Icons/right-arrow.png';*/
import Heart from '../Icons/heart.png';
import DownArrow from '../Icons/down-arrow.png';
import UpArrow from '../Icons/up-arrow.png';
import Clock from '../Icons/clock.png';
/*import Flag from '../Icons/flag.png';
import Bubble from '../Icons/bubble.png';
import Bell from '../Icons/bell.png';
import { Link } from "react-router-dom";*/

import CommentList from './CommentList';
import ContentBody from './ContentBody';

const InfoTab = ({ commentIsActive, content, infoIsActive, onClick, type, zoom }) => {

    if (content) {
      let reward = content.pending_payout_value === "0.000 HBD" ? content.total_payout_value.replace("HBD", "") : content.pending_payout_value.replace("HBD", "");

      const compareDate = (contentDate) => {
        var g1 = new Date().toISOString().substring(0, 10);
        var g2 = contentDate;
        if (g1 >= g2) {
          g1 = g1.split("-");
          g2 = g2.split("-");
          var g3 = [g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]]
          if (g3[0] > 0) {
            return g3[0] === 1 ? `${g3[0]} year ago` : `${g3[0]} years ago`;
          } else if (g3[1] > 0) {
            return g3[1] === 1 ? `${g3[1]} month ago` : `${g3[1]} months ago`;
          } else if (g3[2] > 0) {
            return g3[2] === 1 ? `${g3[2]} day ago` : `${g3[2]} days ago`;
          }
        }
      }

      const ActiveInfoTab = () => {
        if (infoIsActive) {
          return (
            <div className="flex">
              <img className="icon toggle" src={UpArrow} alt="up-arrow" onClick={onClick} />

              <div className="time-block flex">
                <img className="icon clock" src={Clock} alt="clock" />
                <p>{compareDate(content.created.slice(0, 10))}</p>
              </div>

              <div className="reward-block flex">
                <p>$ {reward}</p>
                <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
              </div>

              <div className="vote-block flex">
                <p>{content.active_votes.length}</p>
                <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
              </div>
            </div>
          )
        } else {
          return <img className="icon toggle" src={DownArrow} alt="down-arrow" onClick={onClick} />
        }
      }

      const ActiveContent = () => {
        if (infoIsActive) {
          return (
            <div>
              <div className="info-banner">
                <div className={type === "comics" ? "author-info flex-col" : "author-info flex-row"}>
                  <img className="panel-profile-pic" src={content.author ? `https://steemitimages.com/u/${content.author}/avatar` : ""} alt=" " />
                  <div className="author-name">
                    <p className="capital">{content.author}</p>
                    <p>Creator</p>
                  </div>
                </div>

                <div className={type === "comics" ? "content-info" : "content-info none"}>
                  <wired-card>
                    <ContentBody content={content}/>
                  </wired-card>
                </div>

              </div>

              <ul className="comments">
                <div className="comment-title flex reset" key="comment-title">
                  {content.replies.length > 0 ? commentIsActive ? <img className="icon comments" src={UpArrow} alt="up-arrow" onClick={onClick} /> : <img className="icon comments" src={DownArrow} alt="down-arrow" onClick={onClick} /> : ""}
                  <h3>{content.replies.length > 0 ? `Comments (${content.replies.length})` : "No Comments"} </h3>
                  <div className="line" />
                </div>
                {commentIsActive ? <CommentList commentData={content} /> : ""}
              </ul>
            </div>
          )
        } else {
          return ""
        }
      }

      return (
        <div className={zoom ? zoom === 90 ? "info-tab zoom-tab" : "info-tab" : "info-tab"}>
          <wired-card>
            <div className="info-card">
              <div className="default-banner flex">
                <ActiveInfoTab />
                <img className="icon heart" src={Heart} alt="heart" />
              </div>
              <ActiveContent />
            </div>
          </wired-card>
        </div>
      );
    } else {
      return ""
    }
}

export default InfoTab;

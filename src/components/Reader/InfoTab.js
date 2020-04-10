import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

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

const InfoTab = ({ author, type }) => {
  const store = React.useContext(StoreContext);

  return useObserver(() => {
    if (store.seriesDetail[store.currentPage] && store.seriesComments[store.currentPage]) {

      const CommentList = ({ commentData }) => {
        if (commentData) {
          var comments = []
           for (let i = 0; i< commentData.length; i++){
             comments.push(
               <li key={commentData[i].permlink}>
                 <CommentBlock content={commentData[i]}/>
               </li>
             )
           }
        } else {
          return <wired-spinner class="custom" spinning duration="1000" />
        }
        return comments;
      } 

      let payout = store.seriesDetail[store.currentPage].pending_payout_value === "0.000 HBD" ? store.seriesDetail[store.currentPage].total_payout_value : store.seriesDetail[store.currentPage].pending_payout_value;
      let reward = payout.replace("HBD", "")

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

      compareDate()
      return (
        <div className="info-tab">
          <wired-card>
            <div className="info-card">
              <div className="default-banner flex">
                <img className="none active icon up-arrow" src={UpArrow} alt="up-arrow" />
                <img className="none icon down-arrow" src={DownArrow} alt="down-arrow" />
                <p>$ {reward}</p>
                <img className="icon down-arrow" src={DownArrow} alt="down-arrow" />
                <p>{store.seriesDetail[store.currentPage].active_votes.length}</p>
                <img className="icon down-arrow" src={DownArrow} alt="down-arrow" />
                <img className="icon clock" src={Clock} alt="clock" />
                <p>{compareDate(store.seriesDetail[store.currentPage].created.slice(0, 10))}</p>
                <img className="icon heart" src={Heart} alt="heart" />
              </div>
              <div className="none active">
                <div className="info-banner">

                  <div className={type === "Comics" ? "author-info" : "author-info none"}>
                    <img className="panel-profile-pic" src={`https://steemitimages.com/u/${author}/avatar`} alt=" " />
                    <div className="author-name">
                      <p className="capital">{author}</p>
                      <p>Creator</p>
                    </div>
                  </div>

                  <div className={type === "Comics" ? "content-info" : "content-info none"}>
                    <wired-card>
                      <ContentBody />
                    </wired-card>
                  </div>

                </div>
              </div>

              <ul>
                <CommentList commentData={store.seriesComments[store.currentPage]}/>
              </ul>
              
            </div>
          </wired-card>
        </div>
      );
    } else {
      return <wired-spinner class="custom" spinning duration="1000" />
    }
  })
}

export default InfoTab;

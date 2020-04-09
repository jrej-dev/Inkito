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
  const CommentList = () => {
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
  
  return useObserver(() => {
    if (store.seriesDetail[store.currentPage]) {
      let payout = store.seriesDetail[store.currentPage].pending_payout_value === "0.000 SBD" ? store.seriesDetail[store.currentPage].total_payout_value : store.seriesDetail[store.currentPage].pending_payout_value;
      let reward = payout.replace("SBD", "")

      //2018-03-29T03:02:27

      /*<script> 
    var g1 = new Date(); 
    // (YYYY-MM-DD) 
    var g2 = new Date(2019 - 08 - 03); 
    if (g1.getTime() < g2.getTime()) 
        document.write("g1 is lesser than g2"); 
    else if (g1.getTime() > g2.getTime()) 
        document.write("g1 is greater than g2"); 
    else
        document.write("both are equal"); 
      
    javascript: ;  
    </script> */

      return (
        <div className="info-tab">
          <wired-card>
            <div className="info-card">
              <div className="default-banner flex">
                <img className="none active icon up-arrow" src={UpArrow} alt="up-arrow"/>
                <img className="none icon down-arrow" src={DownArrow} alt="down-arrow"/>
                <p>$ {reward}</p>
                <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
                <p>{store.seriesDetail[store.currentPage].active_votes.length}</p>
                <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
                <img className="icon clock" src={Clock} alt="clock"/>
                <p>{store.seriesDetail[store.currentPage].created.slice(0,10)}</p>
                <img className="icon heart" src={Heart} alt="heart"/>
              </div>
              <div className="none active">
                <div className="info-banner">
                  
                  <div className={type === "Comics" ? "author-info" : "author-info none"}>
                    <img className="panel-profile-pic"src={`https://steemitimages.com/u/${author}/avatar`} alt=" "/>
                    <div className="author-name">
                      <p>{author}</p>
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
                <CommentList />
              </ul>
            </div>
          </wired-card>
        </div>
      );
    } else {
      return <wired-spinner class="custom" spinning duration="1000"/>
    }
  })
}

export default InfoTab;

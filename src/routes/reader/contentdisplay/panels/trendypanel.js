import React from 'react';
import TrendyIcon from '../../../../assets/icons/trendyicon.png';
import DefaultAvatar from '../../../../assets/icons/defaultavatar.png';
import './panels.scss';
import { Link } from "react-router-dom";
import Img from "react-cool-img";

function TrendyPanel({ content, onClick, user }) {
  let author = content.author;
  let reward = content.last_payout.replace("HBD", " ");
  let seriesTitle = content.seriesId ? content.seriesId !== author ? content.seriesId.replace(`${author}-`, "") : "series" : "noseries";

  return (
    <div className="trendy-card">
      <wired-card elevation="3" className="trendy-card">
        <div className="trendy-panel">
          <button className="panel-image hide" onClick={() => onClick({ author, seriesTitle })}>
            {/*Create a default image instead of random image*/}
            <Img className="panel-main-image" src={content.image ? content.image : ""} alt="panel-main-thumbnail" height="238" width="340"/>
            <Img className="panel-icon" src={TrendyIcon} alt="fire-icon" />
          </button>
          <div className="panel-banner">
            <Link to={`/@${content.author}`}>
              <Img className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` ? `https://images.hive.blog/u/${content.author}/avatar` : content.profile_image.includes("https") ? content.profile_image : DefaultAvatar} alt={`${content.author}-avatar`} />
            </Link>
            <span className="panel-info">
              <span className="panel-title" onClick={() => onClick({ author, seriesTitle })}>
                <button className="hide pointer">
                  {content.title.length > 35 ? `${content.title.slice(0, 35)}...` : content.title}
                </button>
              </span>
              <span className="panel-dash">{" / "}</span>
                <Link to={`/@${content.author}`}>
                  <span className="panel-creator capital">
                    {author}
                  </span>
                </Link>
            </span>
            { user.user ? 
              <div className="reward-block">
                <p>Last Payout:</p>
                <p className="reward">$ {(parseInt(reward, 10)/2).toFixed(2)}</p>
              </div>
              :
              ""
            }
          </div>
        </div>
      </wired-card>
    </div>
  );
}

export default TrendyPanel;
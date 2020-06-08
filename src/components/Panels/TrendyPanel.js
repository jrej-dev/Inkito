import React from 'react';
import TrendyIcon from '../Icons/trendyicon.png';
import DefaultAvatar from '../Icons/defaultavatar.png';
import '../../sass/components/Panels.scss';
//import 'wired-elements';
import { Link } from "react-router-dom";

function TrendyPanel({ content, onClick, user }) {

  let author = content.author;
  const reward = content.last_payout.replace("HBD", " ")

  let seriesTitle = content.seriesId ? content.seriesId !== author ? content.seriesId.replace(`${author}-`, "") : "series" : "noseries";

  return (
    <div className="trendy-card">
      <wired-card elevation="3" className="trendy-card">
        <div className="trendy-panel">
          <button className="panel-image hide" onClick={() => onClick({ author, seriesTitle })}>
            {/*Create a default image instead of random image*/}
            <img className="panel-main-image" src={content.image ? content.image : ""} alt="panel-main-thumbnail" />
            <img className="panel-icon" src={TrendyIcon} alt="fire-icon" />
          </button>
          <div className="panel-banner">
            <Link to={`/@${content.author}`}>
              <img className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` ? `https://images.hive.blog/u/${content.author}/avatar` : content.profile_image.includes("https") ? content.profile_image : DefaultAvatar} alt=" " />
            </Link>
            <span className="panel-info">
              <span className="panel-title" onClick={() => onClick({ author, seriesTitle })}>
                <button className="hide pointer">
                  {content.title.length > 60 ? `${content.title.slice(0, 60)}...` : content.title}
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
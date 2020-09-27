import React from 'react';
import NewIcon from '../../../assets/icons/newicon.png';
import DefaultAvatar from '../../../assets/icons/defaultavatar.png';
import { Link } from "react-router-dom";
import Img from "react-cool-img";
import loadingImage from '../../../assets/images/loading_img.gif';
import './panels.scss';

function NewPanel({ content, onClick, user }) {
  let author = content.author;
  let reward = content.last_payout.replace("HBD", " ")
  let seriesTitle = content.seriesId ? content.seriesId !== author ? content.seriesId.replace(`${author}-`, "") : "series" : "noseries";

  return (
    <div className="new-card">
      <wired-card elevation="2">
        <div className="new-panel">
          <button className="panel-image hide" onClick={() => onClick({ author, seriesTitle })}>
            {/*Create a default image instead of random image*/}
            <Img placeholder={loadingImage} className="panel-main-image" src={content.image ? content.image : ""} alt="panel-main-thumbnail" height="204" width="340" />
            <Img placeholder={loadingImage} className="panel-icon" src={NewIcon} alt="fire-icon" />
          </button>
          <div className="panel-banner">
            <Link to={`/@${content.author}`} aria-label={`${content.author}-avatar`}>
              <Img placeholder={loadingImage} className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` ? `https://images.hive.blog/u/${content.author}/avatar` : content.profile_image.includes("https") ? content.profile_image : DefaultAvatar} alt={`${content.author}-avatar`} />
            </Link>
            <span className="panel-info">
              <span className="panel-title" onClick={() => onClick({ author, seriesTitle })}>
                <button className="hide pointer">
                  {content.title.length > 60 ? `${content.title.slice(0, 60)}...` : content.title}
                </button>
              </span>
              <span className="panel-dash">{" / "}</span>
              <span className="panel-creator capital">
                <Link to={`/@${content.author}`}>
                  {author}
                </Link>
              </span>
            </span>
            {user.user ?
              <div className="reward-block">
                <p>Last Payout:</p>
                <p className="reward">$ {(parseInt(reward, 10) / 2).toFixed(2)}</p>
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

export default NewPanel;
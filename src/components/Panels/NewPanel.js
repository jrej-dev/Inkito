import React from 'react';
import NewIcon from '../Icons/newicon.png';
import DefaultAvatar from '../Icons/defaultavatar.png';
import '../../sass/components/Panels.scss';
//import 'wired-elements';
import { Link } from "react-router-dom";

function NewPanel({ content, onClick, user }) {
  let author = content.author;
  const reward = content.last_payout.replace("HBD", " ")

  let seriesTitle = content.seriesId ? content.seriesId.replace(`${author}-`, "") : "noseries";

  return (
    <div className="new-card">
      <wired-card elevation="2">
        <div className="new-panel">
          <div className="panel-image" onClick={() => onClick({ author, seriesTitle })}>
            {/*Create a default image instead of random image*/}
            <img className="panel-main-image" src={content.image ? content.image : ""} alt="panel-main-thumbnail" />
            <img className="panel-icon" src={NewIcon} alt="fire-icon" />
          </div>
          <div className="panel-banner">
            <Link to={`/@${content.author}`}>
              <img className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` ? `https://images.hive.blog/u/${content.author}/avatar` : content.profile_image.includes("https") ? content.profile_image : DefaultAvatar} alt=" " />
            </Link>
            <span className="panel-info">
              <span className="panel-title" onClick={() => onClick({ author, seriesTitle })}>{content.title.length > 60 ? `${content.title.slice(0, 60)}...` : content.title}</span>
              <span className="panel-dash">{" / "}</span>
              <span className="panel-creator capital">
                <Link to={`/@${content.author}`}>
                  {author}
                </Link>
              </span>
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

export default NewPanel;
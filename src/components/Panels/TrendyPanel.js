import React from 'react';
import TrendyIcon from '../Icons/trendyicon.png';
import '../../sass/components/Panels.scss';
import 'wired-elements';

function TrendyPanel({ content, onClick }) {

  let author = content.author;
  const reward = content.last_payout.replace("HBD"," ")
  
  let seriesTitle = content.seriesId ? content.seriesId.replace(`${author}-`,"") : "noseries";

  return (
    <div className="trendy-card">
      <wired-card elevation="3" className="trendy-card">
        <div className="trendy-panel">
            <div className="panel-image" onClick={() => onClick({author, seriesTitle})}>
              <img className="panel-main-image" src={content.image ? content.image : "https://i.picsum.photos/id/356/300/300.jpg"} alt="panel-main-thumbnail"/>
              <img className="panel-icon" src={TrendyIcon} alt="fire-icon"/>
            </div>
            <div className="panel-banner">
              <img className="panel-profile-pic"src={`https://steemitimages.com/u/${author}/avatar`} alt=" "/>
              <span className="panel-info" onClick={() => onClick({author, seriesTitle})}>
                <span className="panel-title">{content.title.length > 60 ? `${content.title.slice(0,60)}...` : content.title}</span> 
                <span>{" / "}</span>
                <span className="panel-creator capital">{author}</span>
              </span>
              <div className="reward-block">
                <p>Last Payout:</p>
                <p className="reward">$ {reward}</p>
              </div>
            </div>
        </div>
      </wired-card>
    </div>
  );
}

export default TrendyPanel;
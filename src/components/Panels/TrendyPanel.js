import React from 'react';
import TrendyIcon from '../../icons/trendyicon.png';
import '../../sass/components/Panels.scss';
import 'wired-elements';

function TrendyPanel({ title, creator, permlink, reward, image, onClick }) {
  return (
    <div className="trendy-card" onClick={() => onClick({creator, permlink})}>
      <wired-card elevation="3" className="trendy-card">
        <div className="trendy-panel">
            <div className="panel-image">
              <img className="panel-main-image" src={image} alt="panel-main-thumbnail"/>
              <img className="panel-icon" src={TrendyIcon} alt="fire-icon"/>
            </div>
            <div className="panel-banner">
              <img className="panel-profile-pic"src={`https://steemitimages.com/u/${creator}/avatar`} alt=" "/>
              <span className="panel-info">
                <span className="panel-title">{title.length > 60 ? `${title.slice(0,60)}...` : title}</span> 
                <span>{" / "}</span>
                <span className="panel-creator">{creator}</span>
              </span>
              <p className="reward">{reward}</p>
            </div>
        </div>
      </wired-card>
    </div>
  );
}

export default TrendyPanel;
import React from 'react';
import TrendyIcon from '../../../Icons/trendyicon.png';
import '../../../sass/components/Panels.scss';

function TrendyPanel({ title, creator, reward }) {
  return (
    <div className="trendy-panel">
        <div className="panel-image">
          <img className="panel-main-image" src="https://picsum.photos/600/600" alt="panel-image"/>
          <img className="panel-icon" src={TrendyIcon} alt="fire-icon"/>
        </div>
        <div className="panel-banner">
          <img className="panel-profile-pic"src="https://picsum.photos/300/300" alt="profile-pic"/>
          <span className="panel-info">
            <span className="panel-title">{title}</span> 
            <span>{" / "}</span>
            <span className="panel-creator">{creator}</span>
          </span>
          <p className="reward">${reward}</p>
        </div>
    </div>
  );
}

export default TrendyPanel;
import React from 'react';
import NewIcon from '../../../Icons/newicon.png';
import '../../../sass/components/Panels.scss';

function NewPanel({ title, creator, reward }) {
  return (
    <div className="new-panel">
        <div className="panel-image">
          <img className="panel-main-image" src="https://picsum.photos/200/300" alt="panel-image"/>
          <img className="panel-icon" src={NewIcon} alt="fire-icon"/>
        </div>
        <div className="panel-banner">
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

export default NewPanel;
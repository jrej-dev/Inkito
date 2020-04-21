import React from 'react';
import NewIcon from '../Icons/newicon.png';
import '../../sass/components/Panels.scss';
import 'wired-elements';

function NewPanel({ content, onClick, onAuthorClick }) {

  let author = content.author;
  const reward = content.last_payout.replace("HBD"," ")
  
  let seriesTitle = content.seriesId ? content.seriesId.replace(`${author}-`,"") : "noseries";

  return (
    <div className="new-card">
      <wired-card elevation="2">
        <div className="new-panel">
            <div className="panel-image" onClick={() => onClick({author, seriesTitle})}>
              <img className="panel-main-image" src={content.image ? content.image : "https://i.picsum.photos/id/356/300/300.jpg"} alt="panel-main-thumbnail" />
              <img className="panel-icon" src={NewIcon} alt="fire-icon"/>
            </div>
            <div className="panel-banner">
              <img className="panel-profile-pic pointer"src={`https://steemitimages.com/u/${author}/avatar`} alt=" " onClick={() => onAuthorClick({author})}/>
              <span className="panel-info">
                <span className="panel-title" onClick={() => onClick({author, seriesTitle})}>{content.title.length > 60 ? `${content.title.slice(0,60)}...` : content.title}</span> 
                <span>{" / "}</span>
                <span className="panel-creator capital" onClick={() => onAuthorClick({author})}>{author}</span>
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

export default NewPanel;
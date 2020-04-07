import React from 'react';
import TrendyIcon from '../../icons/trendyicon.png';
import '../../sass/components/Panels.scss';
import 'wired-elements';

function TrendyPanel({ content, onClick }) {

  //for tags and images
  let trendyJson = JSON.parse(content.json_metadata);

  const reward = content.pending_payout_value !== "0.000 SBD" ? content.pending_payout_value : content.total_payout_value;
  const rewardNumber = reward.replace("SBD"," ")

  let filter = trendyJson.tags.filter(tag => tag.includes("-series"));
  let seriesTitle = filter[0] ? filter[0].replace("-series","") : "noseries";

  let author = content.author;
  let permlink = content.permlink;

  return (
    <div className="trendy-card">
      <wired-card elevation="3" className="trendy-card">
        <div className="trendy-panel">
            <div className="panel-image" onClick={() => onClick({author, permlink, seriesTitle})}>
              <img className="panel-main-image" src={trendyJson.image ? trendyJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"} alt="panel-main-thumbnail"/>
              <img className="panel-icon" src={TrendyIcon} alt="fire-icon"/>
            </div>
            <div className="panel-banner">
              <img className="panel-profile-pic"src={`https://steemitimages.com/u/${content.author}/avatar`} alt=" "/>
              <span className="panel-info" onClick={() => onClick({author, permlink})}>
                <span className="panel-title">{content.title.length > 60 ? `${content.title.slice(0,60)}...` : content.title}</span> 
                <span>{" / "}</span>
                <span className="panel-creator">{content.author}</span>
              </span>
              <p className="reward">$ {rewardNumber}</p>
            </div>
        </div>
      </wired-card>
    </div>
  );
}

export default TrendyPanel;
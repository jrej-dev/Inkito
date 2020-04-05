import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';
import '../../sass/components/Body.scss';
import '../../sass/components/Panels.scss';

import TrendyPanel from '../Panels/TrendyPanel';
import NewPanel from '../Panels/NewPanel';

import TrendyIcon from '../../icons/trendyicon.png';
import NewIcon from '../../icons/newicon.png';
import { Link, useHistory } from "react-router-dom";

function ContentDisplay({ content, newData, trendyData, activeCategory, activeTrend, panelBlockNumber }) {
  const store = React.useContext(StoreContext);
  const history = useHistory();

  const categoryClickHandle = (e) => {
    if (!e.target.className.includes("isActive")) {
      if (content === "Comics") {
        store.updateActiveComicCategory(e.target.className);
      } else if (content === "Novels") {
        store.updateActiveNovelCategory(e.target.className);
      }
    }
  }
  
  const contentClickHandle = (props) => {
    if (content === "Comics") {
      history.push(`/comicreader/?author=${props.creator}&permlink=${props.permlink}`);
    } else if ( content === "Novels") {
      history.push(`/novelreader/?author=${props.creator}&permlink=${props.permlink}`);
    }
  }

  const trendClickHandle = (e) => {
    if (content === "Comics") {
      if (e.target.className.includes("trendy")) {
        store.updateActiveComicTrend("trendy");
      } else if (e.target.className.includes("new")) {
        store.updateActiveComicTrend("new");
      } else if (e.target.className.includes("all")) {
        store.updateActiveComicTrend("all");
      }
    } else if (content === "Novels") {
      if (e.target.className.includes("trendy")) {
        store.updateActiveNovelTrend("trendy");
      } else if (e.target.className.includes("new")) {
        store.updateActiveNovelTrend("new");
      } else if (e.target.className.includes("all")) {
        store.updateActiveNovelTrend("all");
      }
    }
  }

  const listedCategories = store.categories.map(name => {
    return (
      <li
        className={activeCategory === name ? name + " isActive" : name}
        onClick={categoryClickHandle} key={name}>
        {name}
      </li>
    )
  })

  const PanelBlocks = () => {
    return useObserver(() => {
      let trendy = toJS(trendyData);
      let fresh = toJS(newData);
      
      if(fresh.length > 0 && trendy.length > 0) {
        var blocks = []; 
        for (let j = 0 ; j < panelBlockNumber; j++) {
          if (fresh[j] !== undefined && trendy[j] !== undefined){            
            let newJson = JSON.parse(fresh[j].json_metadata);
            let trendyJson = JSON.parse(trendy[j].json_metadata);
              if (j % 2 === 0) {
                blocks.push(
                  <div key={trendy[j].title} className="panel-block">
                    <TrendyPanel 
                      title={trendy[j].title} 
                      creator={trendy[j].author} 
                      permlink={trendy[j].permlink}
                      reward={trendy[j].pending_payout_value} 
                      image={trendyJson.image ? trendyJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                      onClick={contentClickHandle}
                    />
                    <NewPanel 
                      title={fresh[j].title} 
                      creator={fresh[j].author}
                      permlink={fresh[j].permlink} 
                      reward={fresh[j].pending_payout_value} 
                      image={newJson.image ? newJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                      onClick={contentClickHandle}
                    />
                  </div>
                )
              } else {
                blocks.push(
                  <div key={fresh[j].title} className="panel-block">
                    <NewPanel 
                      title={fresh[j].title} 
                      creator={fresh[j].author}
                      permlink={fresh[j].permlink}  
                      reward={fresh[j].pending_payout_value} 
                      image={newJson.image ? newJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                      onClick={contentClickHandle}
                    />
                    <TrendyPanel 
                      title={trendy[j].title} 
                      creator={trendy[j].author} 
                      permlink={trendy[j].permlink}
                      reward={trendy[j].pending_payout_value} 
                      image={trendyJson.image ? trendyJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                      onClick={contentClickHandle}
                   />
                  </div>
                )
              }
          } else if (fresh[j] === undefined) {
            let trendyJson = JSON.parse(trendy[j].json_metadata);
            blocks.push(
              <div key={trendy[j].title} className="panel-block">
                <TrendyPanel 
                  title={trendy[j].title} 
                  creator={trendy[j].author}
                  permlink={trendy[j].permlink} 
                  reward={trendy[j].pending_payout_value} 
                  image={trendyJson.image ? trendyJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                  onClick={contentClickHandle}
                />
              </div>
            )
          } else if (trendy[j] === undefined) {
            let newJson = JSON.parse(fresh[j].json_metadata);
            blocks.push(
              <div key={fresh[j].title} className="panel-block">
                <NewPanel 
                  title={fresh[j].title} 
                  creator={fresh[j].author}
                  permlink={fresh[j].permlink}  
                  reward={fresh[j].pending_payout_value} 
                  image={newJson.image ? newJson.image[0] : "https://i.picsum.photos/id/356/300/300.jpg"}
                  onClick={contentClickHandle}
                />
              </div>
            )
          } else {
            return blocks;
          }
        }
        return blocks;
      } else {
        return <wired-spinner class="custom" spinning duration="1000"></wired-spinner>
      }
    })
  }

  return (
    <div className={activeTrend === "all" ? "content-display" : activeTrend === "trendy" ? "content-display only-trendy" : "content-display only-new"}>
      <div className="title-line">
        <h2>
          <Link to={`/${content}`}>
            {content}
          </Link>
        </h2>
        <div className={activeTrend === "all" ? "trend isActiveUnderlined" : "trend"} onClick={trendClickHandle}>
          <h3 className="all">All</h3>
        </div>
        <div className={activeTrend === "trendy" ? "trend isActiveUnderlined" : "trend"} onClick={trendClickHandle}>
          <img className="icon trending-icon trendy" src={TrendyIcon} alt="fire logo" />
          <h3 className="trendy">Trending</h3>
        </div>
        <div className={activeTrend === "new" ? "trend isActiveUnderlined" : "trend"} onClick={trendClickHandle}>
          <img className="icon new-icon new" src={NewIcon} alt="green arrow" />
          <h3 className="new">New</h3>
        </div>
      </div>
      <ul className="categories">
        {listedCategories}
      </ul>
      <div className="panels">
        <PanelBlocks />
      </div>
    </div>
  );
}

export default ContentDisplay;
import React from 'react';
import StoreContext from '../../stores/AppStore';
//import 'wired-elements';

import '../../sass/components/Body.scss';
import '../../sass/components/Panels.scss';

import PanelBlocks from './PanelBlock';

import TrendyIcon from '../Icons/trendyicon.png';
import NewIcon from '../Icons/newicon.png';
import { Link } from "react-router-dom";

function ContentDisplay({ type, newData, trendyData, activeCategory, activeTrend, panelBlockNumber }) {
  const store = React.useContext(StoreContext);

  const categoryClickHandle = (e) => {
    if (!e.target.className.includes("isActive")) {
      if (type === "comics") {
        store.updateActiveComicCategory(e.target.className);
      } else if (type === "novels") {
        store.updateActiveNovelCategory(e.target.className);
      }
    }
  }

  const trendClickHandle = (e) => {
    if (type === "comics") {
      if (e.target.className.includes("trendy")) {
        store.updateActiveComicTrend("trendy");
      } else if (e.target.className.includes("new")) {
        store.updateActiveComicTrend("new");
      } else if (e.target.className.includes("all")) {
        store.updateActiveComicTrend("all");
      }
    } else if (type === "novels") {
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
      <li>
        <button
          className={activeCategory === name ? name + " isActive" : name}
          onClick={categoryClickHandle} key={name}
          style={{border: "none"}}
          >
            {name}
        </button>
      </li>
    )
  })

  return (
    <div className={activeTrend === "new" ? "content-display only-new" : "content-display"}>
      <div className="title-line">
        <Link to={`/${type}`}>
          <h2 className="capital">
            {type}
          </h2>
        </Link>
          <button className={activeTrend === "all" ? "trend all isActiveUnderlined hide" : "trend all hide "} onClick={trendClickHandle}>
              <h3 className="all">All</h3>
          </button>
          <button className={activeTrend === "trendy" ? "trend trendy isActiveUnderlined hide" : "trend trendy hide"} onClick={trendClickHandle}>
            <img className="icon trending-icon trendy" src={TrendyIcon} alt="fire logo" />
            <h3 className="trendy">Trending</h3>
          </button>
        <button className={activeTrend === "new" ? "trend new isActiveUnderlined hide" : "trend new hide"} onClick={trendClickHandle}>
          <img className="icon new-icon new" src={NewIcon} alt="green arrow" />
          <h3 className="new">New</h3>
        </button>
      </div>
      <ul role="toolbar" className="categories">
        {listedCategories}
      </ul>
      <div className="panels">
        <PanelBlocks type={type} newData={newData} trendyData={trendyData} activeTrend={activeTrend} panelBlockNumber={panelBlockNumber} />
      </div>
    </div>
  );
}

export default ContentDisplay;
import React from 'react';
import StoreContext from '../../stores/AppStore';
import 'wired-elements';

import '../../sass/components/Body.scss';
import '../../sass/components/Panels.scss';

import PanelBlocks from './PanelBlock';
import TrendyIcon from '../../icons/trendyicon.png';
import NewIcon from '../../icons/newicon.png';
import { Link } from "react-router-dom";

function ContentDisplay({ type, newData, trendyData, activeCategory, activeTrend, panelBlockNumber }) {
  const store = React.useContext(StoreContext);

  const categoryClickHandle = (e) => {
    if (!e.target.className.includes("isActive")) {
      if (type === "Comics") {
        store.updateActiveComicCategory(e.target.className);
      } else if (type === "Novels") {
        store.updateActiveNovelCategory(e.target.className);
      }
    }
  }

  const trendClickHandle = (e) => {
    if (type === "Comics") {
      if (e.target.className.includes("trendy")) {
        store.updateActiveComicTrend("trendy");
      } else if (e.target.className.includes("new")) {
        store.updateActiveComicTrend("new");
      } else if (e.target.className.includes("all")) {
        store.updateActiveComicTrend("all");
      }
    } else if (type === "Novels") {
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

  return (
    <div className={activeTrend === "all" ? "content-display" : activeTrend === "trendy" ? "content-display only-trendy" : "content-display only-new"}>
      <div className="title-line">
        <h2>
          <Link to={`/${type}`}>
            {type}
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
        <PanelBlocks type={type} newData={newData} trendyData={trendyData} panelBlockNumber={panelBlockNumber}/>
      </div>
    </div>
  );
}

export default ContentDisplay;
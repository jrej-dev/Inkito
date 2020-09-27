import React from 'react';
import StoreContext from '../../stores/appstore';
import { Link } from "react-router-dom";

import PanelBlocks from './panelblock/panelblock';
import TrendyIcon from '../../assets/icons/trendyicon.png';
import NewIcon from '../../assets/icons/newicon.png';
import './panels/panels.scss';

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
      <li key={name}>
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
          <div className="separator"/>
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
      <ul className="categories">
        {listedCategories}
      </ul>
      <div className="panels">
        <PanelBlocks type={type} newData={newData} trendyData={trendyData} activeTrend={activeTrend} panelBlockNumber={panelBlockNumber} />
      </div>
      {
        type === "comics"?
        <Link to="/comics">
            <h3 className="more">See more...</h3>
        </Link>
        :
        <Link to="/novels">
          <h3 className="more">See more...</h3>
        </Link>
      }
    </div>
  );
}

export default ContentDisplay;
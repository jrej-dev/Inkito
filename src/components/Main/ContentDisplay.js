import React from 'react';
import '../../sass/components/Body.scss';
import '../../sass/components/Panels.scss';

import TrendyPanel from './Panels/TrendyPanel';
import NewPanel from './Panels/NewPanel';

import TrendyIcon from '../../Icons/trendyicon.png';
import NewIcon from '../../Icons/newicon.png';

function ContentDisplay({ content, activeCategory, catClickHandle }) {

  const categories = [
    "All Categories",
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice Of Life"
  ];

  const listedCategories = categories.map(name => {
    return <li 
      className={activeCategory === name ? name + " isActive" : name}
      onClick={catClickHandle} key={name}>
      {name}
    </li>
  })

  return (
    <div className="content-display">
      <div className="title-line">
          <h2>{content}</h2>
          <img className="icon trending-icon" src={TrendyIcon} alt="fire logo"/>
          <h3 className="trending">Trending</h3>
          <img className="icon new-icon" src={NewIcon} alt="green arrow"/>
          <h3 className="new">New</h3>
      </div>
      <ul className="categories">
          {listedCategories}
      </ul>
      <div className="panels">
          <div className="panel-block">
            <TrendyPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
            <NewPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
          </div>
          <div className="panel-block">
            <NewPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
            <TrendyPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
          </div>
          <div className="panel-block">
            <TrendyPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
            <NewPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
          </div>
          <div className="panel-block">
            <NewPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
            <TrendyPanel title={"Title"} creator={"Creator Name"} reward={1.25}/>
          </div>
      </div>
    </div>
  );
}

export default ContentDisplay;
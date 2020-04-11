import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';
import Promo from '../../components/Main/Promo';
import ContentDisplay from '../../components/Main/ContentDisplay';

const Home = () => {
  const store = React.useContext(StoreContext);

  useEffect (() => {  
    store.updateActiveComicCategory("All Categories");
    store.updateActiveNovelCategory("All Categories");
    store.updateActiveComicTrend("all");
    store.updateActiveNovelTrend("all");
  })

  const ComicContent = () => {    
    return useObserver(() => {
      return <ContentDisplay 
        type={"Comics"}
        newData={store.newComics}
        trendyData={store.trendingComics}
        activeTrend={store.activeComicTrend}
        activeCategory={store.activeComicCategory}
        panelBlockNumber={"4"}
      />
    })
  }

  const NovelContent = () => {
    return useObserver(() => (
      <ContentDisplay 
        type={"Novels"}
        newData={store.newNovels}
        trendyData={store.trendingNovels}
        activeTrend={store.activeNovelTrend}
        activeCategory={store.activeNovelCategory}
        panelBlockNumber={"4"}
      />
    ))
  }
  
  return (
    <div className="home">
      <Nav />
      <Hero />
      <Promo />
      <ComicContent />
      <Link to="/comics">
        <h3 className="more">See more...</h3>
      </Link>
      <NovelContent />
      <Link to="/novels">
        <h3 className="more">See more...</h3>
      </Link>
    </div>
  );
}


export default Home;

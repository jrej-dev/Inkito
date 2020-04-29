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
    fetchContent();
    document.documentElement.scrollTop = 0;
    store.updateActiveComicCategory("All Categories");
    store.updateActiveNovelCategory("All Categories");
    store.updateActiveComicTrend("all");
    store.updateActiveNovelTrend("all");
    store.updateCurrentPage(0);
    return () => store.toggleNavMenu(false);
  })

  const fetchContent = () => {
    if (store.newComics.length === 0) {
      store.fetchComics();
    } 
    if (store.newNovels.length === 0){
      store.fetchNovels();
    }
  }
  
  const ComicContent = () => {    
    return useObserver(() => {
      return <ContentDisplay 
        type={"comics"}
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
        type={"novels"}
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
      <div onClick={() => store.toggleNavMenu(false)}>
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
    </div>
  );
}


export default Home;

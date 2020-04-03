import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";

import Hero from '../../components/Main/Hero';
import Promo from '../../components/Main/Promo';
import ContentDisplay from '../../components/Main/ContentDisplay';

const Home = () => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    store.fetchComics("trending");
    store.fetchComics("created");
    store.fetchNovels("trending");
    store.fetchNovels("created");
  }, [store])

  const ComicContent = () => {    
    return useObserver(() => {
      return <ContentDisplay 
        content={"Comics"}
        newData={store.newComics}
        trendyData={store.trendingComics}
        activeTrend={store.activeComicTrend}
        activeCategory={store.activeComicCategory}
        panelBlockNumber={"4"}
        componentName={"ComicContent"}
      />
    })
  }

  const NovelContent = () => {
    return useObserver(() => (
      <ContentDisplay 
        content={"Novels"}
        newData={store.newNovels}
        trendyData={store.trendingNovels}
        activeTrend={store.activeNovelTrend}
        activeCategory={store.activeNovelCategory}
        panelBlockNumber={"4"}
        componentName={"NovelContent"}
      />
    ))
  }
  
  return (
    <div className="home">
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

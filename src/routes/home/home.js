import React, { useEffect } from 'react';
import StoreContext from '../../stores/appStore';
import { useObserver } from 'mobx-react';
import { Helmet } from "react-helmet-async";

import Hero from '../../components/hero/hero';
//import Promo from './promo/promo';
import ContentDisplay from '../reader/contentdisplay/contentdisplay';

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
      store.fetchContent("comics", 24);
    } 
    if (store.newNovels.length === 0){
      store.fetchContent("novels", 24);
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
        panelBlockNumber={8}
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
        panelBlockNumber={8}
      />
    ))
  }


  
  return (
    <>
    <Helmet>
      <html lang="en" />
      <title>Inkito | Home</title>
    </Helmet>

    <div className="home">
      <div onClick={() => store.toggleNavMenu(false)}>
        <Hero />
        {/*<Promo />*/}
        <ComicContent />
        <NovelContent />
      </div>
    </div>
    </>
  );
}


export default Home;
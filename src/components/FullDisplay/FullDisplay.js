import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

import Nav from '../../components/Main/Nav';
import ComicHero from './ComicHero';
import NovelHero from './NovelHero';
import ContentDisplay from '../Main/ContentDisplay';

const FullDisplay = ({ display }) => {
  const store = React.useContext(StoreContext);

  const ComicContent = () => {
    return useObserver(() => (
      <ContentDisplay 
        type={"comics"} 
        newData={store.newComics}
        trendyData={store.trendingComics}
        activeTrend={store.activeComicTrend}
        activeCategory={store.activeComicCategory} 
        panelBlockNumber={12}
      />
    ))
  }

  const NovelContent = () => {
    return useObserver(() => (
      <ContentDisplay 
        type={"novels"}
        newData={store.newNovels}
        trendyData={store.trendingNovels}
        activeTrend={store.activeNovelTrend}
        activeCategory={store.activeNovelCategory}
        panelBlockNumber={12}
      />
    ))
  }

  return (
    <div className="fullDisplay">
      <Nav />
      {display === "novels"?
      <NovelHero /> :
      <ComicHero />
      }
      {display === "novels"?
      <NovelContent /> :
      <ComicContent />
      }
    </div>
  );
}


export default FullDisplay;

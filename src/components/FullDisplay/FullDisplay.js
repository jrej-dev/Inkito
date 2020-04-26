import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

import Nav from '../../components/Main/Nav';
import ComicHero from './ComicHero';
import NovelHero from './NovelHero';
import ContentDisplay from '../Main/ContentDisplay';

const FullDisplay = ({ type }) => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    if (type === "comics"){
      if (store.newComics.length === 0){
        store.fetchComics();
      }
    } else if (type === "novels"){
      if (store.newNovels.length === 0){
        store.fetchNovels();      
      }
    }
  })

  const ComicContent = () => {
    return useObserver(() => {
      return (
        <ContentDisplay
          type={"comics"}
          newData={store.newComics}
          trendyData={store.trendingComics}
          activeTrend={store.activeComicTrend}
          activeCategory={store.activeComicCategory}
          panelBlockNumber={12}
        />
      )
    })
  }

  const NovelContent = () => {
    return useObserver(() => {
      return (
        <ContentDisplay
          type={"novels"}
          newData={store.newNovels}
          trendyData={store.trendingNovels}
          activeTrend={store.activeNovelTrend}
          activeCategory={store.activeNovelCategory}
          panelBlockNumber={12}
        />
      )
    })
  }

  return (
    <div className="fullDisplay">
      <Nav />
      {type === "novels" ?
        <NovelHero /> :
        <ComicHero />
      }
      {type === "novels" ?
        <NovelContent /> :
        <ComicContent />
      }
    </div>
  );
}


export default FullDisplay;

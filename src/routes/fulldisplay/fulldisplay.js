import React, { useEffect } from 'react';
import StoreContext from '../../stores/appStore';
import { useObserver } from 'mobx-react';
import { Helmet } from "react-helmet-async";

import ComicHero from '../../components/hero/comichero';
import NovelHero from '../../components/hero/novelhero';
import ContentDisplay from '../reader/contentdisplay/contentdisplay';

const FullDisplay = ({ type }) => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (type === "comics") {
        store.fetchContent("comics", 12);  
    } else if (type === "novels") {
        store.fetchContent("novels", 12);  
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
    <>
      <Helmet>
        <html lang="en" />
        <title>Inkito | {type === "novels" ? "Novels" : "Comics"}</title>
      </Helmet>
      <div className="fullDisplay">
        {type === "novels" ?
          <NovelHero /> :
          <ComicHero />
        }
        {type === "novels" ?
          <NovelContent /> :
          <ComicContent />
        }
      </div>
    </>
  );
}


export default FullDisplay;

import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import '../../sass/components/Reader.scss';
import 'wired-elements';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const Blog = ({ type, page, permlink, nextPermlink, author }) => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    if (page === 0 || store.seriesDetail[page] === undefined) {
      store.fetchSeriesDetail(author, permlink, page);
    }
    if (page + 1 < store.seriesLinks.length) {
      store.fetchSeriesDetail(author, nextPermlink, page + 1);
    }
    window.addEventListener('scroll', closeZoomBanner);
  })

  const infoClickHandle = (e) => {
    if (e.target.className.includes("toggle")) {
      store.toggleInfoTab(page);
    } else if (e.target.className.includes("comments")) {
      store.toggleComments(page);
    }
  }

  const zoomHandle = (e) => {
    if (e.target.className.includes("zoom-cover")) {
      store.toggleZoomBanner();
    } else if (e.target.className.includes("zoom-in")) {
      store.updateZoom(20);
    } else if (e.target.className.includes("zoom-out")) {
      store.updateZoom(-20);
    } else {
      store.toggleZoomBanner(false);
    }
  }


  const closeZoomBanner = () => {
    store.toggleZoomBanner(false);
  }

  const Content = () => {
    return useObserver(() => {
      if (toJS(store.seriesDetail).length > 0 && store.activeComments.length > 0 && store.activeInfoTab.length > 0) {
        if (type === "comics") {
          return (
            <div>
              <div className={store.zoomIsActive ? "zoom-banner flex-start isActive" : "zoom-banner flex-start"} onClick={zoomHandle}>
                <div className="zoom-cover">Zoom</div>
                <button className="zoom-in zoom-btn flex">+</button>
                <button className="zoom-out zoom-btn flex">-</button>
              </div>
              <div className={`comic-body content-body zoom-${store.zoom}`} onClick={closeZoomBanner}>
                <ContentBody content={toJS(store.seriesDetail)[page]} />
              </div>
              <InfoTab commentIsActive={store.activeComments[page]} infoIsActive={store.activeInfoTab[page]} type={type} content={toJS(store.seriesDetail)[page]} onClick={infoClickHandle} zoom={store.zoom} />
            </div>
          )
        } else if (type === "novels") {
          return (
            <div>
              <div className="novel-body zoom-70">
                <wired-card elevation="2">
                  <div className="content-body">
                    <ContentBody content={toJS(store.seriesDetail)[page]} />
                  </div>
                </wired-card>
              </div>
              <InfoTab commentIsActive={store.activeComments[page]} infoIsActive={store.activeInfoTab[page]} type={type} content={toJS(store.seriesDetail)[page]} onClick={infoClickHandle} />
            </div>
          )
        }
      } else {
        return <wired-spinner className="flex" class="custom" spinning duration="1000" />
      }
    })
  }

  return (
    <div className="blog flex">
      <Content />
      {/*if more content exists show down arrow
          <img src={DownArrow} alt="down-arrow"/>*/}
    </div>
  );
}

export default Blog;

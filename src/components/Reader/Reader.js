import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import '../../sass/components/Reader.scss';
//import 'wired-elements';

import Blog from './Blog';
import NavReader from './NavReader';
import NavReaderBottom from './NavReaderBottom';
import AuthorBanner from './AuthorBanner';
//import DownArrow from '../Icons/down-arrow.png';

const Reader = ({ type }) => {
  const store = React.useContext(StoreContext);

  var props = {};
  var lastScrollTop = 0;

  useEffect(() => {
    getUrlVars();
    store.fetchPermlinks(props.author, props.seriesTitle);

    props.currentPage ? store.updateCurrentPage(props.currentPage) : store.updateCurrentPage(0);

    document.documentElement.scrollTop = 0;
    window.addEventListener('scroll', handleScroll);
    return () => {window.removeEventListener('scroll', handleScroll); store.toggleNavMenu(false); store.toggleShareMenu(false); store.resetSeriesDetail(); }
  })

  const getUrlVars = () => {
    var address = window.location.href;

    var indexOfReader = address.indexOf("Reader");
    address = address.slice(indexOfReader + 7, address.length);

    var params = address.split("/");
    props.author = params[0];
    props.seriesTitle = params[1];

    if (params[2]) {
      props.currentPage = parseInt(params[2]);
    }
    return props;
  }

  const handleScroll = () => {
    var st = document.documentElement.scrollTop;
    if (st < lastScrollTop) {
      store.toggleNav(false);
      store.toggleNavMenu(false);
      store.toggleShareMenu(false);  
      store.toggleShareMenuBottom(false);
    } else if (st > 200) {
      store.toggleNav(true);
      // upscroll code
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
      if (store.currentPage + 1 < store.seriesLinks.length && store.seriesDetail[store.currentPage + 1]) {
        store.closeInfoTab();
        store.scrollCurrentPage(store.currentPage + 1);
      }
    }
  }

  const navClickHandle = (e) => {
    if (e.target.className.includes("right-arrow")) {
      document.documentElement.scrollTop = 0;
      store.updateCurrentPage(store.currentPage + 1);
    } else if (e.target.className.includes("left-arrow")) {
      document.documentElement.scrollTop = 0;
      store.updateCurrentPage(store.currentPage - 1);
    } else if (e.target.className.includes("first")) {
      document.documentElement.scrollTop = 0;
      store.updateCurrentPage(0);
    } else if (e.target.className.includes("last")) {
      document.documentElement.scrollTop = 0;
      store.updateCurrentPage(store.seriesLinks.length - 1);
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

  const ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesLinks);
      var blogs = [];
      if (type === "comics") {
        blogs = [<div key="zoom-banner" className={store.zoomIsActive ? "zoom-banner flex-start isActive" : "zoom-banner flex-start"} onClick={zoomHandle}>
          <div className="zoom-cover">Zoom</div>
          <button className="zoom-in zoom-btn flex">+</button>
          <button className="zoom-out zoom-btn flex">-</button>
        </div>];
      } else {
        blogs = [];
      }

      if (store.seriesLinkState === "done" && seriesData.length > 0 && seriesData.length >= store.currentPage + 1) {
        for (let i = store.startPage; i <= store.currentPage; i++) {
          blogs.push(
            <li key={seriesData[i] + store.currentPage} className="blog">
              <Blog 
                type={type} 
                page={i} 
                author={props.author} 
                permlink={seriesData[i]} 
                nextPermlink={seriesData.length === store.currentPage + 1 ? undefined : seriesData[i + 1]} 
                
                />
              <p className="none scroll">Scroll to read more</p>
            </li>
          )
        }
      } else {
        return (
          /*store.currentPage >= seriesData.length ? <div className="flex no-content"><h3>No content Found</h3></div> :*/
          <div className="flex no-content">
            <wired-spinner className="flex" class="custom" spinning duration="1000" />
          </div>
        )
      }
      return blogs;
    })
  }

  const Nav = () => {
    return useObserver(() => {
      if (store.seriesLinkState === "done" && toJS(store.seriesLinks).length > 0 && toJS(store.seriesDetail).length > 0 && toJS(store.userDetail)) {
        return (
          <NavReader
            page={store.currentPage}
            seriesLength={toJS(store.seriesLinks).length}
            onClick={navClickHandle}
            firstPage={toJS(store.seriesDetail)[0]}
            currentPage={toJS(store.seriesDetail)[store.currentPage]}
            lastPage={toJS(store.seriesDetail)[store.seriesLinks.length-1]}

            isHidden={store.navIsHidden}
            navMenuIsActive={store.navMenuIsActive}
            shareIsActive={store.shareMenuIsActive}
            
            userDetail={toJS(store.userDetail)}
            seriesInfo={toJS(store.seriesInfo)}
            followState={store.followState}

            voteState={store.voteState}
          />
        )
      } else {
        return (
          <NavReader onClick={navClickHandle} />
        )
      }
    })
  }

  const BottomNav = () => {
    return useObserver(() => {
      if (toJS(store.seriesDetail).length > 0 && toJS(store.seriesDetail)[store.currentPage] && toJS(store.seriesDetail)[0] && store.seriesLinks.length > 0) {
        return (
          <NavReaderBottom
            page={store.currentPage}
            length={store.seriesLinks.length}
            onClick={navClickHandle}
            content={toJS(store.seriesDetail)}
            isHidden={store.navIsHidden}
          />
        )
      } else {
        return (
          <NavReaderBottom onClick={navClickHandle} />
        )
      }
    })
  }

  const BottomBanner = () => {
    return useObserver(() => {
      if (store.seriesDetail.length > 0 && toJS(store.seriesDetail)[0]) {
        if (store.currentPage < store.seriesDetail.length - 1) {
          return (
            <div className="scroll-text">
              <p >Scroll to read more.</p>
              <wired-spinner className="flex" class="custom" spinning duration="3000" />
              {/*<img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>*/}
            </div>
          )
        } else {
          return <AuthorBanner 
            author={props.author} 
            content={toJS(store.seriesDetail)[0]} 
            shareIsActive={store.shareMenuBottomIsActive} 
            userDetail={toJS(store.userDetail)} 
            followState={store.followState}                 
            seriesInfo={toJS(store.seriesInfo)}
          />
        }
      } else return ""
    })
  }

  return (
    <div className="reader">
      <Nav />
      <ul className="list-blog" onClick={() => {store.toggleNavMenu(false); store.toggleShareMenu(false)}}>
        <ListedBlogs />
      </ul>
      <BottomBanner />
      <BottomNav />
    </div>
  );
}

export default Reader;
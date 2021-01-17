import React, { useEffect } from 'react';
import StoreContext from '../../stores/appStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { Helmet } from 'react-helmet-async';
import { getUrlVars } from '../../utilities/getUrlVars';
//Components
import Blog from './blog/blog';
import BottomBanner from './bottombanner/bottombanner';
import NavReader from '../../components/nav/navreader/navreader';
import NavReaderBottom from '../../components/nav/navreader/navreaderbottom';

//Style
import './reader.scss';
import { bookmark } from '../../utilities/bookmark';

const Reader = ({ type }) => {
  const store = React.useContext(StoreContext);
  var props = getUrlVars("Reader/");
  var lastScrollTop = 0;

  //Props effects
  useEffect(() => {
    store.fetchPermlinks(props.author, props.seriesTitle);
    if (props.currentPage) {
      store.updateCurrentPage(props.currentPage)
    } else {
      store.updateCurrentPage(0)

      //Redirect to bookmarked page if any.
      let bookmarkPage = bookmark.getPage(props.author, props.seriesTitle);
      if (bookmarkPage && bookmarkPage !== store.currentPage) {
        store.updateCurrentPage(bookmarkPage)
      }
    }
  })

  //Scroll effects
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); store.toggleNavMenu(false); store.toggleShareMenu(false); store.resetSeriesDetail()}
  })

  const handleScroll = () => {
    var st = document.documentElement.scrollTop;
    if (st < lastScrollTop) {
      // backscroll code
      store.toggleNav(false);
      store.toggleNavMenu(false);
      store.toggleShareMenu(false);
      store.toggleShareMenuBottom(false);
    } else if (st > 200) {
      // upscroll code
      store.toggleNav(true);
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
      //Load next page if not final one
      if (store.currentPage + 1 < store.seriesLinks.length && store.seriesDetail[store.currentPage + 1]) {
        store.closeInfoTab();
        store.scrollCurrentPage(store.currentPage + 1);
        bookmark.setPage(props.author, props.seriesTitle, store.currentPage);
      }
    }
  }

  let ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesLinks);
      var blogs;
      // Adding zoom feature only for comics.
      if (type === "comics") {
        blogs = [
          <div key="zoom-banner" className={store.zoomIsActive ? "zoom-banner flex-start isActive" : "zoom-banner flex-start hide"} onClick={zoomHandle}>
            <button className="hide zoom-cover"><p className="cover">Zoom</p></button>
            <button className="zoom-in zoom-btn flex white">+</button>
            <button className="zoom-out zoom-btn flex white">-</button>
          </div>
        ];
      } else {
        //No zoom for novels.
        blogs = [];
      }

      if (store.seriesLinkState === "done" && seriesData.length > 0 && seriesData.length >= store.currentPage + 1) {
        for (let i = store.startPage; i <= store.currentPage; i++) {
          blogs.push(
            <li key={seriesData[i]} className="blog">
              <Blog
                type={type}
                page={i}
                author={props.author}
                permlink={seriesData[i]}
                nextPermlink={seriesData[i + 1]}
              />
            </li>
          )
        }
      } else {
        return (
          <div className="flex no-content">
            <wired-spinner className="flex" class="custom" spinning duration="1000" />
          </div>
        )
      }
      return blogs;
    })
  }

  //Navigation buttons
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
    bookmark.setPage(props.author, props.seriesTitle, store.currentPage);
  }

  const zoomHandle = (e) => {
    if (e.target.className.includes("cover")) {
      store.toggleZoomBanner();
    } else if (e.target.className.includes("zoom-in")) {
      store.updateZoom(20);
    } else if (e.target.className.includes("zoom-out")) {
      store.updateZoom(-20);
    } else {
      store.toggleZoomBanner(false);
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Inkito | Content Reader</title>
      </Helmet>
      <div className="reader">
        <NavReader onClick={navClickHandle} />
        <ul className="list-blog" onClick={() => { store.toggleNavMenu(false); store.toggleShareMenu(false) }}>
          <ListedBlogs />
        </ul>
        <BottomBanner author={props.author}/>
        <NavReaderBottom onClick={navClickHandle} />
      </div>
    </>
  );
}

export default Reader;
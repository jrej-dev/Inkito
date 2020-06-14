import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";

import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { useHistory } from "react-router-dom";

import '../../sass/components/Reader.scss';

import Blog from './Blog';
import NavReader from './NavReader';
import NavReaderBottom from './NavReaderBottom';
import AuthorBanner from './AuthorBanner';

const Reader = ({ type }) => {
  const store = React.useContext(StoreContext);
  const history = useHistory();

  var props = {};

  useEffect(() => {
    getUrlVars();
    store.fetchPermlinks(props.author, props.seriesTitle);

    props.currentPage ? store.updateCurrentPage(props.currentPage) : store.updateCurrentPage(0);

    document.documentElement.scrollTop = 0;
    window.addEventListener('scroll', handleScroll);
    
    return () => { window.removeEventListener('scroll', handleScroll); store.toggleNavMenu(false); store.toggleShareMenu(false); store.resetSeriesDetail()}
  })

  const bookmarkInit = (author, title) => {
    var storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (storedBookmarks) {
      var reader = window.location.href.slice(window.location.href.indexOf("Reader")-5,window.location.href.indexOf("Reader")+6);
      for (let bookmark of storedBookmarks) {
        if (bookmark.id === `${author}-${title}` && bookmark.currentPage !== store.currentPage) {
          history.push(`/${reader}/${author}/${title}/${bookmark.currentPage}`);
          window.location.reload();
          break;
        }
      }
    }
  }

  const setBookmark = (author, title) => {
    var storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    
    var bookmark = [];
    if (storedBookmarks) {
      storedBookmarks = storedBookmarks.filter(object => object.id !== `${author}-${title}`);
      bookmark = [...storedBookmarks, {id: `${author}-${title}`, currentPage: store.currentPage}];
    } else {
      bookmark = [{id: `${author}-${title}`, currentPage: store.currentPage}];
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmark));
  }

  const getUrlVars = () => {
    var address = window.location.href;

    var indexOfReader = address.indexOf("Reader");
    address = address.slice(indexOfReader + 7, address.length);

    var params = address.split("/");
    props.author = params[0];
    props.seriesTitle = params[1];

    if (params[2]) {
      props.currentPage = parseInt(params[2]);
    } else {
      bookmarkInit(props.author, props.seriesTitle);
    }
    return props;
  }

  var lastScrollTop = 0;

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
      if (store.currentPage + 1 < store.seriesLinks.length && store.seriesDetail[store.currentPage + 1]) {
        store.closeInfoTab();
        store.scrollCurrentPage(store.currentPage + 1);
        setBookmark(props.author, props.seriesTitle);
      }
    }
  }

  const scrollBottom = () => {
    document.documentElement.scrollTop = document.documentElement.offsetHeight;
  }

  let ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesLinks);
      var blogs = [];
      if (type === "comics") {
        // Adding zoom feature only for comics.
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
    setBookmark(props.author, props.seriesTitle);
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
            lastPage={toJS(store.seriesDetail)[store.seriesLinks.length - 1]}

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
            <div className="scroll-text flex col">
              <button className="hide" onClick={scrollBottom}>Scroll to read more.</button>
              <wired-spinner className="flex" class="custom" spinning duration="3000" />
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
    <>
      <Helmet>
        <html lang="en" />
        <title>Inkito | Content Reader</title>
      </Helmet>
      <div className="reader">
        <Nav />
        <ul className="list-blog" onClick={() => { store.toggleNavMenu(false); store.toggleShareMenu(false) }}>
          <ListedBlogs />
        </ul>
        <BottomBanner />
        <BottomNav />
      </div>
    </>
  );
}

export default Reader;
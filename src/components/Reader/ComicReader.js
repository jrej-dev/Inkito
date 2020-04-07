import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import '../../sass/components/Reader.scss';
import 'wired-elements';

import ComicBlog from './ComicBlog';
import NavReader from './NavReader';
//import DownArrow from '../../icons/down-arrow.png';


const ComicReader = () => {
  const store = React.useContext(StoreContext);

  var props = {};

  useEffect (() => {
    getUrlVars();
    //store.fetchPostDetail(props.author, props.permlink);
    store.fetchSeries(props.series)
    store.updateCurrentPage(1);
  })

  const getUrlVars = () => {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        props[key] = value;
    });
    return props;
  }

  const navClickHandle = (e) => {
    console.log(e);
  }

  const ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesDetail);
      var blogs = [];
      if (store.currentPage <= seriesData.length) {
        for (let i = 0; i < store.currentPage; i++) {
          blogs.push(
            <li key={seriesData[i].title} className="blog">
              <ComicBlog content={seriesData[i]}/>
            </li>
          )
        }
      } else {
        return <wired-spinner class="custom" spinning duration="1000"></wired-spinner>
      }
      return blogs;
    })
  }

  const Nav = () => {
    return useObserver(() => {
      if (store.seriesDetail[store.currentPage-1]) {
        return (
          <NavReader 
            page={store.currentPage}
            title={store.seriesDetail[store.currentPage-1].title}
            length={store.seriesDetail.length}
            onClick={navClickHandle}
          />
        )
      } else {
        return ""
      }
    })
  }

  return (
    <div className="reader comic-reader">
      <Nav/>
        <ul>
          <ListedBlogs />
        </ul>
    </div>     
  );
  
}

export default ComicReader;

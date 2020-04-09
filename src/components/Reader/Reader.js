import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import '../../sass/components/Reader.scss';
import 'wired-elements';

import Blog from './Blog';
import NavReader from './NavReader';
//import DownArrow from '../../icons/down-arrow.png';


const Reader = ({ type }) => {
  const store = React.useContext(StoreContext);

  var props = {};

  useEffect(() => {
    getUrlVars();
    store.resetSeriesDetail();
    store.fetchPermlinks(props.author, props.seriesTitle);
    
    if (store.seriesDetail[0] === undefined){
      store.fetchSeriesDetail(props.author, store.seriesLinks[0], 0);
    } 
    props.currentPage ? store.updateCurrentPage(props.currentPage) : store.updateCurrentPage(0);
  })

  const getUrlVars = () => {
    var address = window.location.href;

    var indexOfReader = address.indexOf("Reader");
    address = address.slice(indexOfReader + 7, address.length);

    var params = address.split("/");
    props.author = params[0];
    props.seriesTitle = params[1]

    if (params[2]) {
      props.currentPage = parseInt(params[2]);
    }
    return props;
  }

  const navClickHandle = (e) => {
    if (e.target.className.includes("right-arrow")) {
      store.updateCurrentPage(store.currentPage + 1);
    } else if (e.target.className.includes("left-arrow")) {
      store.updateCurrentPage(store.currentPage - 1);

      //Left to do below
    } else if (e.target.className.includes("heart")) {
      console.log("like")
    } else if (e.target.className.includes("comment")) {
      console.log("comment")
    } else if (e.target.className.includes("follow")) {
      console.log("follow")
    }
  }

  const ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesLinks);
      var blogs = [];
      if (store.currentPage <= seriesData.length) {
        for (let i = store.startPage; i <= store.currentPage; i++) {
          blogs.push(
            <li key={seriesData[i]+store.currentPage} className="blog">
              <Blog type={type} page={store.currentPage} author={props.author} permlink={seriesData[i]} nextPermlink={seriesData[i + 1]} />
            </li>
          )
        }
      } else {
        return <wired-spinner class="custom" spinning duration="1000"/>
      }
      return blogs;
    })
  }

  const Nav = () => {
    return useObserver(() => {
      if (store.seriesLinks) {
        return (
          <NavReader
            page={store.currentPage}
            length={store.seriesLinks.length}
            onClick={navClickHandle}
            content={toJS(store.seriesDetail)}
          />
        )
      } else {
        return ""
      }
    })
  }

  return (
    <div className="reader">
      <Nav />
      <ul>
        <ListedBlogs />
      </ul>
    </div>
  );

}

export default Reader;

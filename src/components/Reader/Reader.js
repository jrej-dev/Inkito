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

  useEffect (() => {
    getUrlVars();
    //store.fetchPostDetail(props.author, props.permlink);
    store.fetchSeries(props.author, props.seriesTitle);
    props.currentPage ? store.updateCurrentPage(props.currentPage) : store.updateCurrentPage(1);
  })

  const getUrlVars = () => {
    var address = window.location.href; 

    var indexOfReader = address.indexOf("Reader");
    address = address.slice(indexOfReader+7,address.length);
  
    var params = address.split("/");
    props.author = params[0];
    props.seriesTitle = params[1]

    if (params[2]) {
      props.currentPage = params[2];
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
      var seriesData = toJS(store.seriesDetail);
      var blogs = [];
      if (store.currentPage <= seriesData.length) {
        for (let i = store.startPage-1; i < store.currentPage; i++) {
            blogs.push(
              <li key={seriesData[i]} className="blog">
                <Blog type={type} page={store.currentPage} author={props.author} currentPage={seriesData[i]} nextPage={seriesData[i+1]}/>
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

export default Reader;

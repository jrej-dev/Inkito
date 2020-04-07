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
    store.fetchSeries(props.author, props.series)
  })

  const getUrlVars = () => {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        props[key] = value;
    });
    return props;
  }

  const ListedBlogs = () => {
    return useObserver(() => {
      var seriesData = toJS(store.seriesDetail)
      if (seriesData.length > 0) {
        var blogs = []; 
        seriesData.forEach(blog => {
          blogs.push(
            <li className="blog">
              <ComicBlog content={blog}/>
            </li>
          )
        })
      } else {
        return <wired-spinner class="custom" spinning duration="1000"></wired-spinner>
      }
      return blogs;
    })
  }

  return (
    <div className="reader comic-reader">
        <NavReader title={store.postTitle}/>
        <ul>
          <ListedBlogs />
        </ul>
    </div>     
  );
  
}

export default ComicReader;

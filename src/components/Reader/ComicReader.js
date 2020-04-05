import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import ReactMarkdown from 'react-markdown/with-html';
import '../../sass/components/Reader.scss';
import 'wired-elements';

import NavReader from './NavReader';

const ComicReader = () => {
  const store = React.useContext(StoreContext);

  var props = {};

  useEffect (() => {
    getUrlVars();
    store.fetchPostDetail(props.author, props.permlink);
  })

  const getUrlVars = () => {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        props[key] = value;
    });
    return props;
  }

  const ContentBody = () => {
    return useObserver(() => {
      if (typeof store.postDetail === "string"){
        return (
          <ReactMarkdown
          source={store.postDetail}
          escapeHtml={false}
          /> 
        )
      } else {
        return <wired-spinner class="custom" spinning duration="1000"></wired-spinner>
      }
    })
  }

  return (
    <div className="reader comic-reader">
        <NavReader title={store.postTitle}/>
        <div className="content-body">
          <ContentBody />
        </div>
    </div>
  );
  
}

export default ComicReader;

import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Reader.scss';
import 'wired-elements';

import ContentBody from './ContentBody';
import NavReader from './NavReader';

const NovelReader = () => {
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

  return (
    <div className="reader novel-reader">
        <NavReader title={store.postTitle}/>
        <wired-card elevation="2">
          <div className="content-body">
              <ContentBody />
          </div>
        </wired-card>
    </div>
  );
  
}

export default NovelReader;

import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Reader.scss';
import 'wired-elements';

import NavReader from './NavReader';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';
import DownArrow from '../../icons/down-arrow.png';


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

  return (
    <div className="reader comic-reader">
        <NavReader title={store.postTitle}/>
          <div className="content-body">
            <ContentBody />
          </div>
        {/*if more content exists show down arrow
        <img src={DownArrow} alt="down-arrow"/>*/}
        <InfoTab author={props.author}/>
    </div>     
  );
  
}

export default ComicReader;

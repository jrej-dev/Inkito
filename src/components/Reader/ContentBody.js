import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import ReactMarkdown from 'react-markdown/with-html';
import 'wired-elements';

const ContentBody = () => {
  const store = React.useContext(StoreContext);

  
  return useObserver(() => {
    if(toJS(store.seriesDetail)[store.currentPage] !== undefined) {  
      return (
        <ReactMarkdown
        source={toJS(store.seriesDetail[store.currentPage].body)}
        escapeHtml={false}
        /> 
      )
    } else {
      return <wired-spinner class="custom" spinning duration="1000"/>
    }
  })
}

  export default ContentBody;

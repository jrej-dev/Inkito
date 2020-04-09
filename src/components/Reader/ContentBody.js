import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import ReactMarkdown from 'react-markdown/with-html';
import 'wired-elements';

const ContentBody = ({ page }) => {
  const store = React.useContext(StoreContext);

  
  return useObserver(() => {
    if(toJS(store.seriesDetail)[page] !== undefined) {  
      return (
        <ReactMarkdown
        source={toJS(store.seriesDetail[page].body)}
        escapeHtml={false}
        /> 
      )
    } else {
      return <wired-spinner class="custom" spinning duration="1000"/>
    }
  })
}

  export default ContentBody;

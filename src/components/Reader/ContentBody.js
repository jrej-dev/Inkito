import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import ReactMarkdown from 'react-markdown/with-html';
import 'wired-elements';

const ContentBody = () => {
    const store = React.useContext(StoreContext);

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

  export default ContentBody;

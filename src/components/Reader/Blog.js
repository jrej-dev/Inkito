import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import '../../sass/components/Reader.scss';
import 'wired-elements';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const Blog = ({ type, page, permlink, nextPermlink, author }) => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    store.fetchSeriesDetail(author, permlink, page);
    if (page + 1 < store.seriesLinks.length) {
      store.fetchSeriesDetail(author, nextPermlink, page+1);
    }
  })

  const Content = () => {
    return useObserver(() => {
      if (toJS(store.seriesDetail)[store.currentPage]) {
        if ( type === "Comics"){
          return ( 
            <div>
              <div className="comic-body content-body">
                  <ContentBody content={toJS(store.seriesDetail[store.currentPage])}/>
              </div>
              <InfoTab type={type} content={toJS(store.seriesDetail[store.currentPage])}/>        
            </div>
          )
        } else if ( type === "Novels" ) {
          return (
            <div>
              <div className="novel-body">
                <wired-card elevation="2">
                <div className="content-body">
                    <ContentBody content={toJS(store.seriesDetail[store.currentPage])}/>
                </div>
              </wired-card>
              </div>
              <InfoTab type={type} content={toJS(store.seriesDetail[store.currentPage])}/>        
            </div>
          )
        }
      } else {
        return <wired-spinner className="flex" class="custom" spinning duration="1000"/>
      }
    })
  }

  return (
    <div className="blog">
      <Content />
          {/*if more content exists show down arrow
          <img src={DownArrow} alt="down-arrow"/>*/}
    </div>     
  );
}

export default Blog;

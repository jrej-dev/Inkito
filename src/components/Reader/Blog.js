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

  const infoClickHandle = (e) => {
    if (e.target.className.includes("toggle")) {
      store.toggleInfoTab(page);
    } else if (e.target.className.includes("comments")) {
      store.toggleComments(page);
    }
  }

  const Content = () => {
    return useObserver(() => {
      if (toJS(store.seriesDetail)[page]) {
        if ( type === "Comics"){
          return ( 
            <div>
              <div className="comic-body content-body">
                  <ContentBody content={toJS(store.seriesDetail[page])}/>
              </div>
              <InfoTab page={page} commentIsActive={store.activeComments[page]} infoIsActive={store.activeInfoTab[page]} type={type} content={toJS(store.seriesDetail[page])} onClick={infoClickHandle}/>        
            </div>
          )
        } else if ( type === "Novels" ) {
          return (
            <div>
              <div className="novel-body">
                <wired-card elevation="2">
                <div className="content-body">
                    <ContentBody content={toJS(store.seriesDetail[page])}/>
                </div>
              </wired-card>
              </div>
              <InfoTab page={page} commentIsActive={store.activeComments[page]} infoIsActive={store.activeInfoTab[page]} type={type} content={toJS(store.seriesDetail[page])} onClick={infoClickHandle}/>        
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

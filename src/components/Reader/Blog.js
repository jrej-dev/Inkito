import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Reader.scss';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const Blog = ({ type, page, permlink, nextPermlink, author }) => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    store.fetchSeriesDetail(author, permlink, page);
    store.fetchSeriesDetail(author, nextPermlink, page+1);
  })

  const Content = () => {
    if ( type === "Comics"){
      return ( 
        <div className="comic-body content-body">
            <ContentBody />
        </div>
      )
    } else if ( type === "Novels" ) {
      return (
        <div className="novel-body">
          <wired-card elevation="2">
          <div className="content-body">
              <ContentBody page={page}/>
          </div>
        </wired-card>
        </div>
      )
    }
  }

  return (
    <div className="blog">
      <Content />
          {/*if more content exists show down arrow
          <img src={DownArrow} alt="down-arrow"/>*/}
      <InfoTab author={author} type={type}/>        
    </div>     
  );
}

export default Blog;

import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Reader.scss';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const Blog = ({ type, page, currentPage, nextPage, author }) => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    store.fetchPostDetail(author, currentPage, page);
    store.fetchPostDetail(author, nextPage, page+1);
  })

  return (
    <div>
        <div className="content-body">
        <ContentBody />
        </div>
        {/*if more content exists show down arrow
        <img src={DownArrow} alt="down-arrow"/>*/}
        <InfoTab />
    </div>     
  );
}

export default Blog;

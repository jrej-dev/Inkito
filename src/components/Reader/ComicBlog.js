import React, { useEffect } from 'react';
import '../../sass/components/Reader.scss';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const ComicBlog = ({ content }) => {

  useEffect (() => {
    console.log(content)
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

export default ComicBlog;

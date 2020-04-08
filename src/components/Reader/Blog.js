import React from 'react';
import '../../sass/components/Reader.scss';
import ContentBody from './ContentBody';
import InfoTab from './InfoTab';

const Blog = ({ type, content }) => {

  return (
    <div>
        <div className="content-body">
        <ContentBody content={content}/>
        </div>
        {/*if more content exists show down arrow
        <img src={DownArrow} alt="down-arrow"/>*/}
        <InfoTab />
    </div>     
  );
}

export default Blog;

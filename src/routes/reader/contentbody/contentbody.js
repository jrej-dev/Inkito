import React from 'react';
import { Remarkable } from 'remarkable';
import { imgify } from '../../../utilities/imgify';

const md = new Remarkable({html: true}).use(imgify);

const ContentBody = ({ content, description }) => {
  if (content && content.body) {
    let imgRegex = /<p>(https?:\/\/.*\.(?:png|jpg))<\/p>/g;
    let body = content.body.replace(/(^--.*-$|^\*\*.*\*$|^__.*_$|<hr\/>)/m, '').replace(/<center>\[!\[inkito-banner.png\].*\n*<\/center>$/gm, '').replace(imgRegex, "<img src='$1' alt='blog-page'/>").trim();
    return (
     <div className={description ? "content align-left" : "content"} dangerouslySetInnerHTML={{ __html: md.render(body) }} />
    )
  } else {
    return ""
  }
}

export default ContentBody;

import React from 'react';
import { Remarkable } from 'remarkable';
import { imgify } from '../../utilities/imgify';

const md = new Remarkable({html: true}).use(imgify);

const ContentBody = ({ content, description }) => {
  if (content) {
    let body = content.body.replace(/(^--.*-$|^\*\*.*\*$|^__.*_$|<hr\/>)/m, '').replace(/<center>\[!\[inkito-banner.png\].*\n*<\/center>$/gm, '').trim();
    return (
     <div className={description ? "content align-left" : "content"} dangerouslySetInnerHTML={{ __html: md.render(body) }} />
    )
  } else {
    return ""
  }
}

export default ContentBody;

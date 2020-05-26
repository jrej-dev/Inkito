import React from 'react';
import { Remarkable } from 'remarkable';
import { imgify } from './imgify';
//import 'wired-elements';

const md = new Remarkable({html: true}).use(imgify);

const ContentBody = ({ content, description }) => {
  if (content) {
    return (
     <div className={description ? "content align-left" : "content"} dangerouslySetInnerHTML={{ __html: md.render(content.body) }} />
    )
  } else {
    return ""
  }
}

export default ContentBody;

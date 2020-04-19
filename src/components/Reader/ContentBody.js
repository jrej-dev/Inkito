import React from 'react';
import { Remarkable } from 'remarkable';
import 'wired-elements';

const md = new Remarkable({html: true})

const ContentBody = ({ content }) => {
  if (content) {
    return (
     <div dangerouslySetInnerHTML={{ __html: md.render(content.body) }} />
    )
  } else {
    return <wired-spinner className="flex" class="custom" spinning duration="1000"/>
  }
}

  export default ContentBody;

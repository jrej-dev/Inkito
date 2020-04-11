import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import 'wired-elements';

const ContentBody = ({ content }) => {
  if (content) {
    return (
      <ReactMarkdown
      source={content.body}
      escapeHtml={false}
      /> 
    )
  } else {
    return <wired-spinner className="flex" class="custom" spinning duration="1000"/>
  }
}

  export default ContentBody;

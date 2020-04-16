import React from 'react';
import '../../sass/components/InfoTab.scss';
import CommentBlock from './CommentBlock';

const CommentList = ({ commentData, reply }) => {
    if (commentData.replies !== undefined) {
      var comments = [];
       for (let i = 0; i< commentData.replies.length; i++){
         comments.push(
           <li key={commentData.replies[i].permlink}>
             <CommentBlock content={commentData.replies[i]} reply={reply}/>
           </li>
         )
       }
    } else {
      return ""
    }
    return comments;
}

export default CommentList;
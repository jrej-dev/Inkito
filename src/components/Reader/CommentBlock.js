import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import 'wired-elements';
import Heart from '../../icons/heart.png';
import DownArrow from '../../icons/down-arrow.png';
import Flag from '../../icons/flag.png';

const CommentBlock = ({ content }) => {
    let payout = content.pending_payout_value === "0.000 HBD" ? content.total_payout_value : content.pending_payout_value;
    let reward = payout.replace("HBD", "");
    
    return (
        <div className="active comment-banner">
            <img className="panel-profile-pic" src={`https://steemitimages.com/u/${content.author}/avatar`} alt=" " />
            <div className="comment-block">
                <div className="comment-upper-banner">
                    <p className="name">{content.author}</p>
                    <img className="icon flag" src={Flag} alt="flag" />
                </div>

                <ReactMarkdown
                    source={content.body}
                    escapeHtml={false}
                    transformImageUri={uri =>
                        uri.startsWith("http") ? uri : `${process.env.IMAGE_BASE_URL}${uri}`
                    }
                />

                <div className="comment-bottom-banner">
                    <img className="icon heart" src={Heart} alt="heart" />
                    <p>{reward}</p>
                    <img className="icon down-arrow" src={DownArrow} alt="down-arrow" />
                    <p>vote number</p>
                    <img className="icon down-arrow" src={DownArrow} alt="down-arrow" />
                    <p>Reply</p>
                </div>
            </div>
        </div>
    )
}

export default CommentBlock;

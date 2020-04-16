import React from 'react';
import 'wired-elements';

import ContentBody from './ContentBody';
import CommentList from './CommentList';

import Clock from '../Icons/clock.png';
import Heart from '../Icons/heart.png';
import UpArrow from '../Icons/up-arrow.png';
import DownArrow from '../Icons/down-arrow.png';
import Flag from '../Icons/flag.png';

const CommentBlock = ({ content, reply }) => {
    
    let payout = content.pending_payout_value === "0.000 HBD" ? content.total_payout_value : content.pending_payout_value;
    let reward = payout.replace("HBD", "");
    
    const Response = () => {
        return (
            <div className="flex reset">
                <img className="sm-icon down-arrow" src={UpArrow} alt="down-arrow" />
                <p>Response:</p>
            </div>
        )
    }

    const compareDate = (contentDate) => {
    var g1 = new Date().toISOString().substring(0, 10);
    var g2 = contentDate;
    if (g1 >= g2) {
        g1 = g1.split("-");
        g2 = g2.split("-");
        var g3 = [g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]]
        if (g3[0] > 0) {
        return g3[0] === 1 ? `${g3[0]} year ago` : `${g3[0]} years ago`;
        } else if (g3[1] > 0) {
        return g3[1] === 1 ? `${g3[1]} month ago` : `${g3[1]} months ago`;
        } else if (g3[2] > 0) {
        return g3[2] === 1 ? `${g3[2]} day ago` : `${g3[2]} days ago`;
        }
    }
    }
    
    return (
        <div className="active comment-banner">
                        
            <img className="panel-profile-pic" src={`https://steemitimages.com/u/${content.author}/avatar`} alt=" " />
            <div className="comment-block">

                <div className="comment-upper-banner flex">       
                    <div className="left-block reset">
                        {reply ? <Response /> : null}
                        <p className="name capital">{content.author}</p>
                        <img className="md-icon clock" src={Clock} alt="clock" />
                        <p>{compareDate(content.created.slice(0, 10))}</p>
                     </div>
                    <img className="md-icon flag" src={Flag} alt="flag" />
                </div>
                
                    <wired-card>
                        <div className="comment-body">
                            <ContentBody content={content}/>
                        </div>
                    </wired-card>   

                <div className="comment-bottom-banner reset">
                    <div className="left-block">
                        <img className="icon heart" src={Heart} alt="heart" />

                        <div className="reward-block flex reset">
                            <p>$ {reward}</p>
                            <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
                        </div>

                        <div className="vote-block flex reset">
                            <p>{content.active_votes.length}</p>
                            <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
                        </div>
                    </div>

                    <p>Reply</p>
                </div>
            </div>
            <ul className="replies">
                <CommentList commentData={content} reply={true}/>
            </ul>
        </div>
    )
}

export default CommentBlock;

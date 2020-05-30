import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useAlert } from 'react-alert'

//import 'wired-elements';
import ContentBody from './ContentBody';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

import Clock from '../Icons/clock.png';
import HeartElement from './HeartElement';
import UpArrow from '../Icons/up-arrow.png';
import DownArrow from '../Icons/down-arrow.png';
//import Flag from '../Icons/flag.png';

import { Link } from "react-router-dom";


const CommentBlock = ({ content, reply, page, replyIsActive, userDetail, commentState, voteState }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    let payout = content.pending_payout_value === "0.000 HBD" ? content.total_payout_value : content.pending_payout_value;
    let reward = payout.replace("HBD", "");

    const Response = () => {
        return (
            <div className="flex reset response">
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
            } else if (g3[2] === 0) {
                return "Today";
            } else {
                return "?";
            }
        }
    }
    return (
        <div className="active comment-banner">
            <Link to={`/@${content.author}`}>
                <img className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` || content.profile_image} alt=" " />
            </Link>
            <div className="comment-block">

                <div className="comment-upper-banner flex">
                    <div className="left-block reset">
                        {reply ? <Response /> : null}
                        <p className="name capital">
                            <Link to={`/@${content.author}`}>
                                {content.author}
                            </Link>
                        </p>
                        <img className="md-icon clock" src={Clock} alt="clock" />
                        <p>{compareDate(content.created.slice(0, 10))}</p>
                    </div>
                    {/*<img className="md-icon flag" src={Flag} alt="flag" />*/}
                </div>

                <wired-card>
                    <div className="comment-body">
                        <ContentBody content={content} />
                    </div>
                </wired-card>

                <div className="comment-bottom-banner flex reset">
                    <div className="left-block">
                        <HeartElement content={content} className="heartElement" page={page} userDetail={userDetail} voteState={voteState} />


                        <div className="reward-block flex reset">
                            <p>$ {reward}</p>
                            <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
                        </div>

                        <div className="vote-block flex reset">
                            <p>{content.active_votes.length}</p>
                            <img className="sm-icon down-arrow" src={DownArrow} alt="down-arrow" />
                        </div>
                    </div>

                    {userDetail.name ?
                        <p className="reply flex-end pointer" onClick={() => { store.toggleReplyIsActive(content.permlink) }}>Reply</p>
                        :
                        <p className="reply flex-end pointer" onClick={() => {
                            alert.show('Please login first.', {
                                timeout: 2000, // custom timeout just for this one alert
                            })
                        }}>Reply</p>
                    }
                </div>
            </div>

            <div className="comments">
                {replyIsActive === content.permlink ? <CommentInput content={content} userDetail={userDetail} commentState={commentState} page={page} /> : <div className="hidden"><CommentInput content={content} page={page} userDetail={userDetail} commentState={commentState} /></div>}
            </div>

            <ul className="replies">
                <CommentList commentData={content} reply={true} page={page} replyIsActive={replyIsActive} userDetail={userDetail} commentState={commentState} voteState={voteState} />
            </ul>
        </div>
    )
}

export default CommentBlock;

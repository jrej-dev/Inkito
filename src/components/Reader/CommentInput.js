import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

import 'wired-elements';

import UpArrow from '../Icons/up-arrow.png';

import { Link } from "react-router-dom";


const CommentInput = ({ content }) => {
    const store = React.useContext(StoreContext);

    const Response = () => {
        return (
            <div className="flex reset">
                <img className="sm-icon down-arrow" src={UpArrow} alt="down-arrow" />
                <p>Response:</p>
            </div>
        )
    }

    return useObserver(() => {
        if (store.userDetail.name) {
            return (
                <div className="active comment-banner">
                    <Link to={`/@${store.userDetail.name}`}>
                        <img className="panel-profile-pic" src={`https://images.hive.blog/u/${store.userDetail.name}/avatar`} alt=" " />
                    </Link>
                    <div className="comment-block">
        
                        <div className="comment-upper-banner flex">
                            <div className="left-block reset">
                                <Response />
                                <p className="name capital">
                                    <Link to={`/@${store.userDetail.name}`}>
                                        {store.userDetail.name}
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="comment-body">
                            <wired-textarea placeholder="Your reply..." rows="6">
                            </wired-textarea>
                        </div>

                        <div className="comment-bottom-banner flex-start pa-hh">
                            <button className="send-btn">Send</button>
                            <p className="pointer" onClick={() => {store.toggleReplyIsActive(content.permlink)}}>Cancel</p>
                        </div>
                    </div>
                    
                </div>
            )
        }
    })
}

export default CommentInput;

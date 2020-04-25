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
        
                        <wired-card>
                            <div className="comment-body">
                                <textarea>
                                    Your reply...
                                </textarea>
                            </div>
                        </wired-card>
        
                        <div className="comment-bottom-banner reset">
                            <p>Send</p>
                        </div>
                    </div>
                    
                </div>
            )
        }
    })
}

export default CommentInput;

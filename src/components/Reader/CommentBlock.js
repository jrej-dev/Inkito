import React from 'react';
//import StoreContext from '../../stores/AppStore';
//import { useObserver } from 'mobx-react';
import 'wired-elements';

import Heart from '../../icons/heart.png';
import DownArrow from '../../icons/down-arrow.png';
import Flag from '../../icons/flag.png';

const CommentBlock = ({ author }) => {
    //const store = React.useContext(StoreContext);

    return (
        <div className="active comment-banner">
            <img className="panel-profile-pic"src={`https://steemitimages.com/u/${author}/avatar`} alt=" "/>
            <div className="comment-block">
                <div className="comment-upper-banner">
                    <p className="name">Name</p>
                    <img className="icon flag" src={Flag} alt="flag"/>
                </div>
                <p className="comment">Comment</p>
                <div className="comment-bottom-banner">
                    <img className="icon heart" src={Heart} alt="heart"/>
                    <p>SBD 1.22</p>
                    <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
                    <p>vote number</p>
                    <img className="icon down-arrow" src={DownArrow} alt="down-arrow"/>
                    <p>Reply</p>
                </div>
            </div>
        </div>
    )
} 

export default CommentBlock;

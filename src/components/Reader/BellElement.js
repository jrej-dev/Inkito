import React from 'react';
import StoreContext from '../../stores/AppStore';

import Bell from '../Icons/bell.png';
import GreenBell from '../Icons/green-bell.png';
import GreyBell from '../Icons/grey-bell.png';


//import 'wired-elements';
import '../../sass/components/InfoTab.scss';

const BellElement = ({ followState, userDetail, seriesInfo, text }) => {
    const store = React.useContext(StoreContext);

    const handleFollow = (username, author) => {
        store.follow(username, author);
    }

    const handleUnfollow = (username, author) => {
        store.unfollow(username, author);
    }

    if (userDetail && seriesInfo) {
        if (userDetail.name && seriesInfo.author && seriesInfo.followers) {
            let username = userDetail.name;
            let followers = seriesInfo.followers;
            let author = seriesInfo.author;

            if (followState === "pending") {
                return (
                    <div className="icon bell flex">
                        <wired-spinner class="custom" spinning duration="1000" />
                    </div>
                )
            } else if (author === username) {
                return (
                    ""
                )
            }
            else if (followers.some(fan => fan === username)) {
                if (text) {
                    return (
                        <div className="flex row pointer follow">
                            <p onClick={() => { handleUnfollow(username, author) }}>Followed</p>
                            <img className="icon bell" src={GreenBell} alt="green-bell" onClick={() => { handleUnfollow(username, author) }} />
                        </div>
                    )
                } else {
                    return (
                        <img className="icon bell" src={GreenBell} alt="green-bell" onClick={() => { handleUnfollow(username, author) }} />
                    )
                }

            } else {
                if (text) {
                    return (
                        <div className="flex row pointer follow">
                            <p onClick={() => { handleFollow(username, author) }}>Follow</p>
                            <img className="icon bell" src={GreyBell} alt="grey-bell" onClick={() => { handleFollow(username, author) }} />
                        </div>
                    )
                } else {
                    return (
                        <img className="icon bell" src={GreyBell} alt="grey-bell" onClick={() => { handleFollow(username, author) }} />
                    )
                }
            }
        } else {
            // inactive
            return (
                <img className="icon bell" src={Bell} alt="bell" />
            )
        }
    } else {
        // inactive
        return (
            <img className="icon bell" src={Bell} alt="bell" />
        )
    }
}

export default BellElement;
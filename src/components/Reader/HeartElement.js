import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

import Heart from '../Icons/heart.png';
import RedHeart from '../Icons/red-heart.png';
import GreyHeart from '../Icons/grey-heart.png';
import 'wired-elements';
import '../../sass/components/InfoTab.scss';

const HeartElement = ({ content, isActive }) => {
    const store = React.useContext(StoreContext);
    
    const handleVote = () => {
        store.vote(store.userDetail.name, content.author, content.permlink, 10000)
    }
    return useObserver(() => {
        if (store.userDetail.name && content.active_votes.length >= 0) {
            if (content.active_votes.some(vote => vote.voter === store.userDetail.name) || store.voteState === `${content.permlink}-done`) {
                return (
                    <img className={isActive ? "icon heart" : "icon heart inactive"} src={RedHeart} alt="red-heart"/>
                )
            } else if (!content.active_votes.some(vote => vote.voter === store.userDetail.name) && store.voteState !== `${content.permlink}-pending`) {
                return (
                    <img className={isActive ? "icon heart" : "icon heart inactive"} src={GreyHeart} alt="grey-heart" onClick={handleVote}/>
                )
            } else if (store.voteState === `${content.permlink}-pending`) {
                return (
                    <div className="icon heart flex">
                        <wired-spinner class="custom" spinning duration="1000" />
                    </div>
                )
            }
            store.resetVoteState();
        } else {
            return (
                <img className={isActive ? "icon heart" : "icon heart inactive"} src={Heart} alt="heart"/>
            )
        }
    })
}

export default HeartElement;
import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';

import Heart from '../Icons/heart.png';
import RedHeart from '../Icons/red-heart.png';
import GreyHeart from '../Icons/grey-heart.png';
import 'wired-elements';
import '../../sass/components/InfoTab.scss';

const HeartElement = ({ content }) => {
    const store = React.useContext(StoreContext);

    const handleVote = () => {
        store.vote(store.userDetail.name, content.author, content.permlink, 10000)
    }
    return useObserver(() => {
        if (store.userDetail.name && content.active_votes.length >= 0) {
            if (content.active_votes.some(vote => vote.voter === store.userDetail.name)) {
                return (
                    <img className="icon heart" src={RedHeart} alt="heart" onClick={handleVote}/>
                )
            } else {
                return (
                    <img className="icon heart" src={GreyHeart} alt="heart" onClick={handleVote}/>
                )
            }
        } else {
            return (
                <img className="icon heart" src={Heart} alt="heart" />
            )
        }
    })
}

export default HeartElement;
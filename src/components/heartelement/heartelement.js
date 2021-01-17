import React from 'react';
import StoreContext from '../../stores/appStore';
import { useAlert } from 'react-alert'

import Heart from '../../assets/icons/heart.png';
import RedHeart from '../../assets/icons/red-heart.png';
import GreyHeart from '../../assets/icons/grey-heart.png';

import '../../routes/reader/infotab/infotab.scss';

const HeartElement = ({ userDetail, content, page, voteState }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const handleVote = (user) => {
        store.vote(user, content.author, content.permlink, 10000, page);
    }

    const isPostActive = (contentDate) => {
        var g1 = new Date().toISOString().substring(0, 10);
        var g2 = contentDate;
        if (g1 >= g2) {
            g1 = g1.split("-");
            g2 = g2.split("-");
            var g3 = [g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]]
            if (g3[0] > 0) {
                return false;
            } else if (g3[1] > 0) {
                return false;
            } else if (g3[2] > 7) {
                return false;
            } else if (g3[2] <= 7) {
                return true;
            }
        }
    }

    if (userDetail && content) {
        if (userDetail.name && content.active_votes.length >= 0) {
            let userName = userDetail.name;
            if (voteState === content.permlink) {
                return (
                    <div className="icon heart flex">
                        <wired-spinner class="custom" spinning duration="1000" />
                    </div>
                )
            } else if (content.active_votes.some(vote => vote.voter === userName)) {
                return (
                    <button className="hide" /*add dislike function here.*/>
                        <img className="icon heart" src={RedHeart} alt="red-heart"/>
                    </button>
                )
            } else if (!content.active_votes.some(vote => vote.voter === store.userDetail.name) && voteState !== content.permlink) {
                if (isPostActive(content.created.slice(0, 10))) {
                    return (
                        <button className="hide" onClick={() => { handleVote(userName) }}>
                            <img className="icon heart" src={GreyHeart} alt="grey-heart" />
                        </button>
                    )
                } else {
                    return (
                        <button className="hide" onClick={() => { handleVote(userName) }}>
                            <img className="icon heart" src={Heart} alt="heart" />
                        </button>
                    )
                }
            }
        } else {
            return (
                <button className="hide" onClick={() => {
                    alert.show('Please login first.', {
                        timeout: 2000, // custom timeout just for this one alert
                    })
                }}>
                    <img className="icon heart" src={Heart} alt="heart" />
                </button>
            )
        }
    } else {
        return (
            <button className="hide" onClick={() => {
                alert.show('Please login first.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
            }}>
                <img className="icon heart" src={Heart} alt="heart" />
            </button>
        )
    }
}

export default HeartElement;
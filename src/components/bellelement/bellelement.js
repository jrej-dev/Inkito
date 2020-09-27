import React from 'react';
import StoreContext from '../../stores/appstore';
import { useAlert } from 'react-alert'
import { Link } from "react-router-dom";

import Bell from '../../assets/icons/bell.png';
import GreenBell from '../../assets/icons/green-bell.png';
import GreyBell from '../../assets/icons/grey-bell.png';

import '../../routes/reader/infotab/infotab.scss';

const BellElement = ({ followState, userDetail, seriesInfo, text, content }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const handleFollow = (username, author) => {
        store.follow(username, author);
    }

    const handleUnfollow = (username, author) => {
        store.unfollow(username, author);
    }

    if (userDetail && seriesInfo) {
        if (userDetail.name && seriesInfo.author) {
            let username = userDetail.name;
            let author = seriesInfo.author;

            if (author === username) {
                if (content) {
                    return (
                        <Link to={{
                            pathname: `/publish?user=${content.author}`,
                            state: {
                                type: window.location.href.includes("comicReader") ? "comic" : "novel",
                                seriesInfo: content,
                                series: content.title,
                            }
                        }}
                        >
                            <p>Edit</p>
                        </Link>
                    )
                } else {
                    return (
                        ""
                    )
                }
            }

            if (seriesInfo.followers) {
                let followers = seriesInfo.followers;

                if (followState === "pending") {
                    return (
                        <div className="icon bell flex">
                            <wired-spinner class="custom" spinning duration="1000" />
                        </div>
                    )
                } else if (followers.some(fan => fan === username)) {
                    if (text) {
                        return (
                            <div className="flex row pointer follow">
                                <button className="hide" onClick={() => { handleUnfollow(username, author) }}>
                                    <p>Followed</p>
                                </button>
                                <button className="hide" onClick={() => { handleUnfollow(username, author) }}>
                                    <img className="icon bell" src={GreenBell} alt="green-bell" />
                                </button>
                            </div>
                        )
                    } else {
                        return (
                            <button className="hide" onClick={() => { handleUnfollow(username, author) }}>
                                <img className="icon bell" src={GreenBell} alt="green-bell" />
                            </button>
                        )
                    }

                } else {
                    if (text) {
                        return (
                            <div className="flex row pointer follow">
                                <button className="hide" onClick={() => { handleFollow(username, author) }}>
                                    <p>Follow</p>
                                </button>
                                <button className="hide" onClick={() => { handleFollow(username, author) }}>
                                    <img className="icon bell" src={GreyBell} alt="grey-bell" />
                                </button>
                            </div>
                        )
                    } else {
                        return (
                            <button className="hide" onClick={() => { handleFollow(username, author) }}>
                                <img className="icon bell" src={GreyBell} alt="grey-bell" />
                            </button>
                        )
                    }
                }
            } else {
                if (text) {
                    return (
                        <img className="icon bell" src={Bell} alt="bell" />
                    )
                } else {
                    return (
                        <img className="icon bell" src={Bell} alt="bell" />
                    )
                }
            }
        } else {
            // inactive
            if (text) {
                return (
                    <div className="flex row pointer follow">
                        <button className="hide" onClick={() => {
                            alert.show('Please login first.', {
                                timeout: 2000, // custom timeout just for this one alert
                            })
                        }}>
                            <p>Follow</p>
                        </button>
                        <button className="hide" onClick={() => {
                            alert.show('Please login first.', {
                                timeout: 2000, // custom timeout just for this one alert
                            })
                        }}>
                            <img className="icon bell" src={Bell} alt="bell" />
                        </button>
                    </div>
                )
            } else {
                return (
                    <button className="hide" onClick={() => {
                        alert.show('Please login first.', {
                            timeout: 2000, // custom timeout just for this one alert
                        })
                    }}>
                        <img className="icon bell" src={Bell} alt="bell" />
                    </button>
                )
            }
        }
    } else {
        // inactive
        if (text) {
            return (
                <div className="flex row pointer follow">
                    <button className="hide" onClick={() => {
                        alert.show('Please login first.', {
                            timeout: 2000, // custom timeout just for this one alert
                        })
                    }}>
                        <p>
                            Follow
                        </p>
                    </button>
                    <button className="hide" onClick={() => {
                        alert.show('Please login first.', {
                            timeout: 2000, // custom timeout just for this one alert
                        })
                    }}>
                        <img className="icon bell" src={Bell} alt="bell"/>
                    </button>
                </div>
            )
        } else {
            return (
                <button className="hide" onClick={() => {
                    alert.show('Please login first.', {
                        timeout: 2000, // custom timeout just for this one alert
                    })
                }}>
                    <img className="icon bell" src={Bell} alt="bell"  />
                </button>
            )
        }
    }
}

export default BellElement;
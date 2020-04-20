import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

//import { Link } from "react-router-dom";

import Nav from '../Main/Nav';
import Location from '../Icons/location.png';
import Link from '../Icons/link.png';
//import Add from '../Icons/add.png';
import 'wired-elements';
import '../../sass/components/Profile.scss';

const ProfilePage = () => {
    const store = React.useContext(StoreContext);
    var props = {};

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getUrlVars();
        store.fetchAuthoInfo(props.author);
    })

    const getUrlVars = () => {
        var address = window.location.href;

        var indexOfReader = address.indexOf("@");
        address = address.slice(indexOfReader + 1, address.length);

        var params = address.split("/");
        props.author = params[0];

        return props;
    }

    const ProfileInfo = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo)) {
                const author = toJS(store.authorInfo);
                return (
                    <div className="profile-info">
                        <div className="author reset">
                            <img
                                className="panel-profile-pic"
                                src={`https://steemitimages.com/u/${author.name}/avatar`}
                                alt=" "
                            />
                            <h2 className="capital">{author.name}</h2>
                        </div>
                        <div className="stats flex pa row">
                            <p>Followers:</p>
                            <p>{author.follow ? author.follow.follower_count : ""}</p>
                            <p>Following:</p>
                            <p>{author.follow ? author.follow.following_count : ""}</p>
                        </div>

                        <div className="description">
                            <p>{author.about}</p>
                        </div>

                        <div className="links">
                            <div className="location flex row">
                                <img className="icon" src={Location} alt="location icon" />
                                <p>{author.location}</p>
                            </div>

                            {/*Optional field? Link*/}
                            <div className="link flex row">
                                <img className="icon" src={Link} alt="link-icon" />
                                <a href={author.website} target="_blank" rel="noopener noreferrer">Website</a>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <wired-spinner class="custom" spinning duration="1000" />
            }
        })
    }

    const CoverImage = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo)) {
                const author = toJS(store.authorInfo);
                return (
                    <div className="cover-image reset flex">
                        <img src={author.cover} alt=" " />
                    </div>
                )
            } else {
                return <wired-spinner class="custom" spinning duration="1000" />
            }
        })
    }

    const SeriesList = () => {
        return useObserver(() => {
            if (true) {
                return (
                    /*array.map(object => {
                        return (
                            <li>
                                <div className="series-thumbnail">
                                    <img src="https://picsum.photos/300/300" alt="" />
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">Ghoul Red One</h3>
                                    <p>Last Update</p>
                                </div>
                            </li>
                        )
                    })*/
                    <li>
                        <div className="series-thumbnail">
                            <img src="https://picsum.photos/300/300" alt="" />
                        </div>
                        <div className="series-info flex reset">
                            <h3 className="series-title">Ghoul Red One</h3>
                            <p>Last Update</p>
                        </div>
                    </li>
                )
            } else {
                return <wired-spinner class="custom" spinning duration="1000" />
            }
        })
    }

    return (
        <div className="profile">
            <Nav />
            <div className="container reset">
                <div className="profile-page">

                    <ProfileInfo />

                    <div className="divider" />

                    <CoverImage />

                    <div className="series">
                        <h2>Series</h2>
                        <ul className="series-list pa">

                            <SeriesList />
                            {/*if more
                                    <li className="add-series">
                                        <img className="lg-icon" src={Add} alt="add-icon"/>
                                    </li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProfilePage;

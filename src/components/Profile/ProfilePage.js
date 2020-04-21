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
            if (toJS(store.authorInfo.series)) {
                if (toJS(store.authorInfo.series).length > 0) {
                    return (
                        <div className="series">
                            <h2>Series</h2>
                            <ComicList />
                            <NovelList />
                            {/*if more
                            <li className="add-series">
                                <img className="lg-icon" src={Add} alt="add-icon"/>
                            </li>*/}
                        </div>
                    )
                } else { return "" }
            } else {
                return ""
            }
        })
    }
    
    const ComicList = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo.series)) {
                let seriesList = [];
                toJS(store.authorInfo).series.forEach(series => {
                    if (series.tags.includes("inkito-comics")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <img src={series.image} alt="" />
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">{series.title}</h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                })
                if (seriesList.length > 0) {
                    return (
                        <div>
                            <h3 className="list-title">Comics</h3>
                            <ul className="series-list pa">
                                {seriesList}
                            </ul>
                        </div>
                    )
                } else { return "" }
            } else {
                return ""
            }
        })
    }

    const NovelList = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo.series)) {
                let seriesList = [];
                toJS(store.authorInfo).series.forEach(series => {
                    if (series.tags.includes("inkito-novels")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <img src={series.image} alt="" />
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">{series.title}</h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                })
                if (seriesList.length > 0) {
                    return (
                        <div>
                            <h3 className="list-title">Novels</h3>
                            <ul className="series-list pa">
                                {seriesList}
                            </ul>
                        </div>
                    )
                } else { return "" }
            } else {
                return ""
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

                    <SeriesList />
                </div>
            </div>
        </div >
    );

}

export default ProfilePage;

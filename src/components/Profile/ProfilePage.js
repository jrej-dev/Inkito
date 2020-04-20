import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
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

    return useObserver(() => {
        return (
            <div className="profile">
                <Nav />
                <div className="container reset">
                    <div className="profile-page">

                        <div className="profile-info">
                            <div className="author reset">
                                <img className="panel-profile-pic" src={props.author ? `https://steemitimages.com/u/${props.author}/avatar` : "https://picsum.photos/400/300"} alt=" " />
                                <h2 className="capital">jrej</h2>
                            </div>
                                <div className="stats flex pa row">
                                    <p>Followers:</p>
                                    <p>875</p>
                                    <p>Following:</p>
                                    <p>12</p>
                                </div>

                            <div className="description">
                                <p>My name is Jrej. I am a french artist living in France. Drawing is one of my hobbies and I've been posting Shades Of Men online since 2012.</p>
                            </div>
                            
                            <div className="links">
                                <div className="location flex row">
                                    <img className="icon" src={Location} alt="location icon" />
                                    <p>Location</p>
                                </div>

                                {/*Optional field? Link*/}
                                <div className="link flex row">
                                    <img className="icon" src={Link} alt="link-icon" />
                                    <p>Link</p>
                                </div>
                            </div>
                        </div>

                        <div className="divider"/>

                        <div className="cover-image reset">
                            <img src="https://picsum.photos/500/300" alt=" " />
                        </div>

                        <div className="series">
                            <h2>Series</h2>
                            <ul className="series-list pa">
                                <li>
                                    <div className="series-thumbnail">
                                        <img src="https://picsum.photos/300/300" alt="" />
                                    </div>
                                    <div className="series-info flex reset">
                                        <h3 className="series-title">Ghoul Red One</h3>
                                        <p>Last Update</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="series-thumbnail">
                                        <img src="https://picsum.photos/400/300" alt="" />
                                    </div>
                                    <div className="series-info flex reset">
                                        <h3>The extra long title for a test</h3>
                                        <p>Last Update</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="series-thumbnail">
                                        <img src="https://picsum.photos/400/400" alt="" />
                                    </div>
                                    <div className="series-info flex reset">
                                        <h3>Title</h3>
                                        <p>Last Update</p>
                                    </div>
                                </li>
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
    })
}

export default ProfilePage;

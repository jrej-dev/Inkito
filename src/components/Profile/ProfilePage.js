import React, { useEffect } from 'react';
//import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
//import { Link } from "react-router-dom";

import Nav from '../Main/Nav';
import 'wired-elements';
import '../../sass/components/Profile.scss';

const ProfilePage = () => {
    //const store = React.useContext(StoreContext);
    var props = {};

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getUrlVars();
        console.log(props.author)
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
                <div className="container flex reset">
                    <div className="profile-page flex row">

                        <div className="profile-info reset">
                            <h1>Profile Page</h1>
                        </div>

                        <div className="cover-image reset">
                            <img src="https://picsum.photos/500/300" alt=" " />
                        </div>

                        <div className="series">
                            <h2>Series</h2>
                            <ul className="series-list flex-start pa">
                                <li>
                                    <div className="series-thumbnail">
                                        <img src="https://picsum.photos/300/300" alt="" />
                                    </div>
                                    <div className="series-info">
                                        <p>Title</p>
                                        <p>Last Update</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="series-thumbnail">
                                        <img src="https://picsum.photos/400/300" alt="" />
                                    </div>
                                    <div className="series-info">
                                        <p>Title</p>
                                        <p>Last Update</p>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        );
    })
}

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import ProfileEdit from './ProfileEdit';
import SeriesList from './SeriesList';
import Nav from '../Main/Nav';
import Location from '../Icons/location.png';
import Link from '../Icons/link.png';
//import Add from '../Icons/add.png';
//import 'wired-elements';
import '../../sass/components/Profile.scss';

const ProfilePage = () => {
    const store = React.useContext(StoreContext);
    //to be changed to false;
    const [isEdited, setEdited] = useState(true);

    var props = {};

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getUrlVars();

        return () => store.toggleNavMenu(false);
    })

    const fetchAuthoInfo = (author) => {
        if (toJS(store.authorInfo).length > 0 && toJS(store.authorInfo).name !== author) {
            store.fetchAuthoInfo(author);
        } else if (toJS(store.authorInfo).length === 0) {
            store.fetchAuthoInfo(author);
        }
    }

    const getUrlVars = () => {
        var address = window.location.href;

        var indexOfReader = address.indexOf("@");
        address = address.slice(indexOfReader + 1, address.length);

        var params = address.split("/");
        props.author = params[0];

        fetchAuthoInfo(props.author);
        return props;
    }

    const handleEdit = () => {
        setEdited(!isEdited);
    }


    const ProfileInfo = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo) && toJS(store.userDetail)) {
                const author = toJS(store.authorInfo);
                const user = toJS(store.userDetail).name || "";
                return (
                    <div className="profile-info">
                        <div className="edit-banner flex-end">
                            {user === author.name ? <p className="edit pointer" onClick={handleEdit}>Edit</p> : ""}
                        </div>
                        <div className="author reset">
                            <img
                                className="panel-profile-pic"
                                src={`https://images.hive.blog/u/${author.name}/avatar`}
                                alt=""
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
                                <img className="icon location" src={Location} alt="location icon" />
                                <p>{author.location}</p>
                            </div>

                            {/*Optional field? Link*/}
                            <div className="link flex row">
                                <a href={author.website} target="_blank" rel="noopener noreferrer" className="flex row"> <img className="icon pointer" src={Link} alt="link-icon" /> Website</a>
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
                        {author.cover ? <img src={author.cover} alt=" " /> : ""}
                    </div>
                )
            } else {
                return <wired-spinner class="custom" spinning duration="1000" />
            }
        })
    }

    return (
        <div className="profile">
            <Nav />
            <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                <div className={isEdited ? "profile-edit" : "profile-page"}>
                    <ProfileInfo />
                    <div className="divider" />
                    <CoverImage />
                    <SeriesList />
                    <ProfileEdit isEdited={isEdited} handleEdit={handleEdit}/>
                </div>
            </div>
        </div >
    );
}

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import StoreContext from '../../stores/appstore';
import { toJS } from 'mobx';
import { Helmet } from "react-helmet-async";
import { getUrlVars } from '../../utilities/getUrlVars';

import ProfileEdit from './profileedit/profileedit';
import SeriesList from './serieslist/serieslist';
import ProfileInfo from './profileinfo/profileinfo';
import CoverImage from './coverimage/coverimage';

import './profile.scss';

const ProfilePage = () => {
    const store = React.useContext(StoreContext);
    const [isEdited, setEdited] = useState(false);
    var props = getUrlVars("@");

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        return () => store.toggleNavMenu(false);
    })

    useEffect(() => {
        if (toJS(store.authorInfo) && toJS(store.authorInfo).name !== props.author) {
            store.fetchAuthorInfo(props.author);
        } else if (toJS(store.authorInfo).length === 0) {
            store.fetchAuthorInfo(props.author);
        }
    }, [props, store])

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>Inkito | Profile Page</title>
            </Helmet>
            <div className="profile">
                <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                    <div className={isEdited ? "profile-edit" : "profile-page"}>
                        <ProfileInfo isEdited={isEdited} setEdited={setEdited}/>
                        <div className="divider" />
                        <CoverImage />
                        <SeriesList />
                        <ProfileEdit isEdited={isEdited} setEdited={setEdited} authorInfo={toJS(store.authorInfo)} state={store.updateProfileState} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;

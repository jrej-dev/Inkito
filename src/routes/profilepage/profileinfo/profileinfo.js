import React from 'react';
import StoreContext from '../../../stores/appstore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import Location from '../../../assets/icons/location.png';
import Link from '../../../assets/icons/link.png';

import '../profile.scss';

const ProfileInfo = ({isEdited, setEdited}) => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.authorInfo)) {
            const author = toJS(store.authorInfo);
            const user = toJS(store.userDetail).name || "";
            return (
                <div className="profile-info">
                    <div className="edit-banner flex-end">
                        {user === author.name ? <button className="hide" onClick={() => setEdited(!isEdited)}><p className="edit pointer">Edit</p></button> : ""}
                    </div>
                    <div className="author reset">
                        <img
                            className="panel-profile-pic"
                            src={author.avatar}
                            alt={`${author.name}-avatar`}
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
                        {
                            author.location ?
                                <div className="location flex row">
                                    <img className="icon location" src={Location} alt="location icon" />
                                    <p>{author.location}</p>
                                </div>
                                :
                                ""
                        }
                        {
                            author.website ?
                                <div className="link flex row">
                                    <a href={author.website} target="_blank" rel="noopener noreferrer" className="flex row" title="author website">
                                        <img className="icon pointer" src={Link} alt="link-icon" />
                                        Website
                                    </a>
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            )
        } else {
            return <wired-spinner class="custom" spinning duration="1000" />
        }
    })
}

export default ProfileInfo;

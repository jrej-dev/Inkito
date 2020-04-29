import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import BellElement from './BellElement';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';
import '../../sass/components/Reader.scss';

import Share from '../Icons/share.png';

import { Link } from "react-router-dom";

const AuthorBanner = ({ author }) => {
    const store = React.useContext(StoreContext);

    useEffect(() => {
        return () => store.toggleNavMenu(false);
    })

    const Follower = () => {
        if (toJS(store.authorInfo)) {
            if (toJS(store.authorInfo).follow) {
                return (
                    <p className="followers">{toJS(store.authorInfo).follow.follower_count} followers</p>
                )
            } else {
                return ""
            }
        } else return ""
    }

    return useObserver(() => {
        if (toJS(store.seriesDetail)[0]) {
            let content = toJS(store.seriesDetail)[0];
            let author = content.author;
     
            return (
                <div className="author-banner flex">
                    <wired-card>
                        <div className="flex-even">
                            <Link to={`/@${content.author}`}>
                                <img className="panel-profile-pic" src={`https://images.hive.blog/u/${author}/avatar`} alt="" />
                            </Link>
                            <Link to={`/@${content.author}`} className="author-name flex col pa-h">
                                <p className="capital">{author}</p>
                                <p>Creator</p>
                                <Follower />
                            </Link>
                            <div className="flex col post-title">
                                <p>
                                    {content ? content.title : ""}
                                </p>
                            </div>
                            <div className="flex row pointer share">
                                <div className="flex row">
                                    <p>Share</p>
                                    <img className="icon share" src={Share} alt="share" />
                                </div>
                                <BellElement text={true} className="bellElement" />
                            </div>
                        </div>
                    </wired-card>
                </div>
            );
        } else {
            return ""
        }
    })
}

export default AuthorBanner;
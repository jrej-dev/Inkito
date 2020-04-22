import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';
import '../../sass/components/Reader.scss';

import Bell from '../Icons/bell.png';
import Share from '../Icons/share.png';

import { Link } from "react-router-dom";

const AuthorBanner = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.seriesDetail)[0]) {
            let content = toJS(store.seriesDetail)[0];
            let author = content.author;
            return (
                <div className="author-banner flex">
                    <wired-card>
                        <div className="flex-even">
                            <Link to={`/@${content.author}`}>
                                <img className="panel-profile-pic" src={`https://steemitimages.com/u/${author}/avatar`} alt="" />
                            </Link>
                            <Link to={`/@${content.author}`} className="author-name flex col pa-h">
                                <p className="capital">{author}</p>
                                <p>Creator</p>
                            </Link>
                            {/*<p className="followers">1500 followers</p>*/}
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
                                <div className="flex row pointer follow">
                                    <p>Follow</p>
                                    <img className="icon follow" src={Bell} alt="follow" />
                                </div>
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
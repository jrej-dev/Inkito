import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';
import '../../sass/components/Reader.scss';

import Bell from '../../icons/bell.png';
import Share from '../../icons/share.png';

//import { Link } from "react-router-dom";

const AuthorBanner = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.seriesDetail)[0]) {
            return (
                <div className="author-banner flex">
                    <wired-card>
                        <div className="flex-even">
                            <img className="panel-profile-pic" src={`https://steemitimages.com/u/${toJS(store.seriesDetail)[0].author}/avatar`} alt=" " />
                            <div className="flex-col">
                                <div className="author-name flex-row">
                                    <p className="capital">{toJS(store.seriesDetail)[0].author}</p>
                                    <p>Creator</p>
                                </div>
                                <p className="followers">1500 followers</p>
                            </div>
                            <div className="flex-col post-title">
                                <p>
                                    {toJS(store.seriesDetail)[0] ? toJS(store.seriesDetail)[0].title : ""}
                                </p>
                            </div>
                            <div className="flex-row pointer share">
                                <div className="flex-row">
                                    <p>Share</p>
                                    <img className="icon share" src={Share} alt="share" />
                                </div>
                                <div className="flex-row pointer follow">
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
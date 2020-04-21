import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';
import '../../sass/components/Reader.scss';

import Bell from '../Icons/bell.png';
import Share from '../Icons/share.png';

//import { Link } from "react-router-dom";

const AuthorBanner = ({ onAuthorClick }) => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.seriesDetail)[0]) {
            let content = toJS(store.seriesDetail)[0];
            let author = content.author;
            return (
                <div className="author-banner flex">
                    <wired-card>
                        <div className="flex-even">
                            <img className="panel-profile-pic pointer" src={`https://steemitimages.com/u/${author}/avatar`} alt="" onClick={() => onAuthorClick({author})}/>
                            <div className="flex-col">
                                <div className="author-name flex-row pointer" onClick={() => onAuthorClick({author})}>
                                    <p className="capital">{author}</p>
                                    <p>Creator</p>
                                </div>
                                {/*<p className="followers">1500 followers</p>*/}
                            </div>
                            <div className="flex-col post-title">
                                <p>
                                    {content ? content.title : ""}
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
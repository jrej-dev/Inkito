import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";
import { toJS } from 'mobx';
import DefaultAvatar from '../../../assets/icons/defaultavatar.png';
import StoreContext from '../../../stores/appStore';
import BellElement from '../../../components/bellelement/bellelement';
import ShareMenu from '../../../components/sharemenu/sharemenu';
import '../reader.scss';


const BottomBanner = ({ author }) => {
    const store = React.useContext(StoreContext);

    useEffect(() => {
        return () => store.toggleNavMenu(false);
    })
    
    //For the scroll button of keyboard users
    const scrollBottom = () => {
        document.documentElement.scrollTop = document.documentElement.offsetHeight;
    }

    return useObserver(() => {
        if (store.seriesDetail.length > 0 && toJS(store.seriesDetail)[0]) {
            let content = toJS(store.seriesDetail)[0]
            let shareIsActive = store.shareMenuBottomIsActive
            let userDetail = toJS(store.userDetail)
            let followState = store.followState
            let seriesInfo = toJS(store.seriesInfo)
            let image = JSON.parse(content.json_metadata).image;
            if (store.currentPage < store.seriesDetail.length - 1) {
                return (
                    <div className="scroll-text flex col">
                        <button className="hide" onClick={scrollBottom}>Scroll to read more.</button>
                        <wired-spinner className="flex" class="custom" spinning duration="3000" />
                    </div>
                )
            } else {
                return (
                    <div className="author-banner flex">
                        <wired-card>
                            <div className="flex-even">
                                <Link to={`/@${content.author}`}>
                                    <img className="panel-profile-pic" src={`https://images.hive.blog/u/${content.author}/avatar` ? `https://images.hive.blog/u/${content.author}/avatar` : content.profile_image.includes("https") ? content.profile_image : DefaultAvatar} alt={`${content.author}-avatar`} />
                                </Link>
                                <Link to={`/@${content.author}`} className="author-name flex col pa-h">
                                    <p className="capital">{author}</p>
                                    <p>Creator</p>
                                    {
                                        seriesInfo && seriesInfo.followers ?
                                            <p className="followers">{seriesInfo.followers.length} followers</p>
                                            :
                                            <></>
                                    }
                                </Link>
                                <div className="flex col post-title">
                                    <p>
                                        {content ? content.title : ""}
                                    </p>
                                </div>
                                <div className="flex row">
                                    <div className="flex row share pointer">
                                        <p>Share</p>
                                        {image ? <ShareMenu image={image[0]} shareIsActive={shareIsActive} bottom={true} /> : <ShareMenu shareIsActive={shareIsActive} bottom={true} />}
                                    </div>
                                    <BellElement className="bellElement pointer" text={true} userDetail={userDetail} seriesInfo={toJS(store.seriesInfo)} followState={followState} />
                                </div>
                            </div>
                        </wired-card>
                    </div>
                );
            }
        } else {
            return <></>
        }
    })
}

export default BottomBanner;
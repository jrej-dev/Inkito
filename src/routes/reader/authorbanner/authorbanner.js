import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { toJS } from 'mobx';
import DefaultAvatar from '../../../assets/icons/defaultavatar.png';
import StoreContext from '../../../stores/appstore';
import BellElement from '../../../components/bellelement/bellelement';
import ShareMenu from '../../../components/sharemenu/sharemenu';
import '../reader.scss';


const AuthorBanner = ({ userDetail, followState, content, shareIsActive, seriesInfo }) => {
    const store = React.useContext(StoreContext);

    useEffect(() => {
        return () => store.toggleNavMenu(false);
    })


    const Follower = () => {

        if (toJS(store.seriesInfo)) {
            if (toJS(store.seriesInfo).followers) {
                return (
                    <p className="followers">{toJS(store.seriesInfo).followers.length} followers</p>
                )
            } else {
                return ""
            }
        } else return ""
    }

        if (content) {
            let author = content.author;
            let image = JSON.parse(content.json_metadata).image;
            
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
                                <Follower />
                            </Link>
                            <div className="flex col post-title">
                                <p>
                                    {content ? content.title : ""}
                                </p>
                            </div>
                            <div className="flex row">
                                <div className="flex row share pointer">
                                    <p>Share</p>
                                    {image ? <ShareMenu image={image[0]} shareIsActive={shareIsActive} bottom={true}/> : <ShareMenu shareIsActive={shareIsActive} bottom={true}/>}
                                </div>
                                <BellElement className="bellElement pointer" text={true} userDetail={userDetail} seriesInfo={toJS(store.seriesInfo)} followState={followState}/>
                            </div>
                        </div>
                    </wired-card>
                </div>
            );
        } else {
            return ""
        }
}

export default AuthorBanner;
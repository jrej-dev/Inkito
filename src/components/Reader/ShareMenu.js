import React from 'react';
import StoreContext from '../../stores/AppStore';
//import { useObserver } from 'mobx-react';
import Share from '../Icons/share.png';
import '../../sass/components/NavReader.scss';

import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";


const ShareMenu = ({ image, shareIsActive }) => {
    const store = React.useContext(StoreContext);
    
    return (
        <div className="sharing">
            <img className="icon share" src={Share} alt="share arrow" onClick={() => store.toggleShareMenu()} />
            <div className={shareIsActive ? "share-menu flex wrap pa" : "share-menu flex wrap pa hidden"}>
                <EmailShareButton url={window.location.href} subject={"Check this out."} body={"Here is a great story I found on Inkito.io"}>
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>

                <FacebookShareButton url={window.location.href} quote={"Check this out."} hashtag={"#inkito"}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={window.location.href} title={"Check this out."} hashtags={["inkito"]} via={"Inkito"}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <TumblrShareButton url={window.location.href} title={"Check this out."} tags={["inkito"]} caption={"Here is a great story I found on Inkito.io"}>
                    <TumblrIcon size={32} round={true} />
                </TumblrShareButton>

                <PinterestShareButton url={window.location.href} media={image} description={"Here is a great story I found on Inkito.io"}>
                    <PinterestIcon size={32} round={true} />
                </PinterestShareButton>

                <TelegramShareButton url={window.location.href} title={"Check this out."}>
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton>

                <RedditShareButton url={window.location.href} title={"Check this out."}>
                    <RedditIcon size={32} round={true} />
                </RedditShareButton>

                <WhatsappShareButton url={window.location.href} title={"Check this out."}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
            </div>
        </div>
    )

}

export default ShareMenu;
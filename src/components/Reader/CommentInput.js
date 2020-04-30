import React, {useState} from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";

import UpArrow from '../Icons/up-arrow.png';
import 'wired-elements';



const CommentInput = ({ content }) => {
    const store = React.useContext(StoreContext);
    const [body, setBody] = useState("");
    
    /*const parentAuthor = content.author;
    const parentPermlink = content.permlink;
    const tags = JSON.parse(content.json_metadata).tags;
    const jsonMetadata = JSON.stringify({ tags, app: 'Inkito' });
    const permlink = "re-"+ content.permlink + "-" + Date.now();
    const title = "";*/


    const Response = () => {
        return (
            <div className="flex reset">
                <img className="sm-icon down-arrow" src={UpArrow} alt="down-arrow" />
                <p>Response:</p>
            </div>
        )
    }

    const handleReplyChange = (e) => {
        setBody(e.target.value);
    }

    const handleReplySubmit = (author) => {
        //store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata)
    }

    return useObserver(() => {
        if (store.userDetail.name) {
            return (
                <div className="active comment-banner">
                    <Link to={`/@${store.userDetail.name}`}>
                        <img className="panel-profile-pic" src={`https://images.hive.blog/u/${store.userDetail.name}/avatar`} alt=" " />
                    </Link>
                    <div className="comment-block">
        
                        <div className="comment-upper-banner flex">
                            <div className="left-block reset">
                                <Response />
                                <p className="name capital">
                                    <Link to={`/@${store.userDetail.name}`}>
                                        {store.userDetail.name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                            <form onSubmit={(e) => {e.preventDefault(); handleReplySubmit(store.userDetail.name)}}>
                                <div className="comment-body">
                                    <textarea 
                                    //disabled
                                    placeholder="Your reply..." 
                                    rows="6" 
                                    onChange={handleReplyChange}
                                    value={body}/>
                                </div>

                                <div className="comment-bottom-banner flex-start pa-hh">
                                    <button type="submit" className="send-btn">Send</button>
                                    <p className="pointer" onClick={() => {store.toggleReplyIsActive(content.permlink)}}>Cancel</p>
                                </div>
                            </form>
                    </div>
                    
                </div>
            )
        }
    })
}

export default CommentInput;

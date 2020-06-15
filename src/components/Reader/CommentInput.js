import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import { Link } from "react-router-dom";

import UpArrow from '../Icons/up-arrow.png';
//import 'wired-elements';



const CommentInput = ({ content, userDetail, page, commentState }) => {
    const store = React.useContext(StoreContext);
    const [body, setBody] = useState("");
    const textArea = useRef(null);

    useEffect(() => {
        var currentTextArea = textArea.current;
        if (currentTextArea) {
            currentTextArea.addEventListener('input', handleChange);
        }
        return () => {
            if (currentTextArea) {
                currentTextArea.removeEventListener('input', handleChange);
            }
        }
    })

    const Response = () => {
        return (
            <div className="flex reset">
                <img className="sm-icon down-arrow" src={UpArrow} alt="down-arrow" />
                <p>Response:</p>
            </div>
        )
    }

    const handleChange = (e) => {
        setBody(e.detail.sourceEvent.target.value);
    }

    const handleReplySubmit = (author, page) => {
        const parentAuthor = content.author;
        const parentPermlink = content.permlink;
        const tags = JSON.parse(content.json_metadata).tags;
        const jsonMetadata = { tags, app: 'Inkito' };
        const permlink = "re-" + content.permlink + "-" + Date.now();
        const title = "";
        store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, page);
    }

    if (content && userDetail && userDetail.name) {
        let userData = JSON.parse(userDetail.account.posting_json_metadata);
        return (
            <div className="active comment-banner">
                <Link to={`/@${userDetail.name}`}>
                    <img className="panel-profile-pic" src={userData.profile.profile_image} alt="avatar" />
                </Link>
                <div className="comment-block">

                    <div className="comment-upper-banner flex">
                        <div className="left-block reset">
                            <Response />
                            <p className="name capital">
                                <Link to={`/@${userDetail.name}`}>
                                    {userDetail.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(userDetail.name, page) }}>
                        <div className="comment-body">
                            {commentState === "pending" ?
                                <wired-textarea
                                    disabled
                                    placeholder="Your reply..."
                                    rows="4"
                                    ref={textArea}
                                    value={body}
                                />
                                :
                                <wired-textarea
                                    placeholder="Your reply..."
                                    rows="4"
                                    ref={textArea}
                                    value={body}
                                />
                            }
                        </div>
                        <div className="comment-bottom-banner flex-start pa-hh">
                            <button type="submit" className="send-btn white">Send</button>
                            <button className="hide pa" onClick={() => { store.toggleReplyIsActive(content.permlink) }}>
                                <p className="pointer">Cancel</p>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        )
    } else {
        return ""
    }
}

export default CommentInput;

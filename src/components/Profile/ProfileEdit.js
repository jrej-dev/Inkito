import React from 'react';
import StoreContext from '../../stores/AppStore';

import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';


const ProfileEdit = ({ isEdited, handleEdit }) => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.authorInfo)) {
            const authorInfo = toJS(store.authorInfo);
            return (
                <div className={isEdited ? "edit flex col pa" : "hidden"}>
                    <h3> Public Profile Settings </h3>
                    <form className="edit-form pa">
                        <div className="avatar">
                            <p>Profile picture url</p>
                            <input type="text" value={authorInfo.avatar}/>
                            <p className="blue">Upload an image</p>
                        </div>
        
                        <div className="cover">
                            <p>Cover image url (Optimal: 2048x512 pixels)</p>
                            <input type="text" value={authorInfo.cover}/>
                            <p className="blue">Upload an image</p>
                        </div>
        
                        <div className="name">
                            <p>Display name</p>
                            <input type="text" value={authorInfo.name}/>
                        </div>
        
                        <div className="about">
                            <p>About me</p>
                            <textarea type="text" value={authorInfo.about}/>
                        </div>
        
                        <div className="website">
                            <p>Website</p>
                            <input type="text" value={authorInfo.website}/>
                        </div>
        
                        {/*<div>
                            <p>Not safe for work (NSFW) content</p>
                            <input type="text"/>
                        </div>*/}
                        <div className="pa">
                            <div className="flex row pa-hh">
                                <button type="submit" className="send-btn">Update</button>
                                <p className="pointer" onClick={handleEdit}>Cancel</p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    })
}

export default ProfileEdit;
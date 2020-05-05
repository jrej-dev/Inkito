import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';

const ProfileEdit = ({ isEdited, handleEdit, authorInfo, state  }) => {
    const store = React.useContext(StoreContext);
    const [avatar, setAvatar] = useState(authorInfo.avatar);
    const [cover, setCover] = useState(authorInfo.cover);
    const [name, setName] = useState(authorInfo.displayName);
    const [about, setAbout] = useState(authorInfo.about);
    const [location, setLocation] = useState(authorInfo.location);
    const [website, setWebsite] = useState(authorInfo.website);

    const avatarInput = useRef(null);
    const coverInput = useRef(null);
    const nameInput = useRef(null);
    const aboutInput = useRef(null);
    const locationInput = useRef(null);
    const websiteInput = useRef(null);


    useEffect(() => {
        var currentAvatar = avatarInput.current;
        var currentCover = coverInput.current;
        var currentName = nameInput.current;
        var currentAbout = aboutInput.current;
        var currentLocation = locationInput.current;
        var currentWebsite = websiteInput.current;

        if (currentAvatar) {
            currentAvatar.addEventListener('input', handleAvatarChange);
        }
        if (currentCover) {
            currentCover.addEventListener('input', handleCoverChange);
        }
        if (currentName) {
            currentName.addEventListener('input', handleNameChange);
        }
        if (currentAbout) {
            currentAbout.addEventListener('input', handleAboutChange);
        }
        if (currentLocation) {
            currentLocation.addEventListener('input', handleLocationChange);
        }
        if (currentWebsite) {
            currentWebsite.addEventListener('input', handleWebsiteChange);
        }
        
        return () => {
            if (currentAvatar) {
                currentAvatar.removeEventListener('input', handleAvatarChange);
            }
            if (currentCover) {
                currentCover.removeEventListener('input', handleCoverChange);
            }
            if (currentName) {
                currentName.removeEventListener('input', handleNameChange);
            }
            if (currentAbout) {
                currentAbout.removeEventListener('input', handleAboutChange);
            }
            if (currentLocation) {
                currentLocation.removeEventListener('input', handleLocationChange);
            }
            if (currentWebsite) {
                currentWebsite.removeEventListener('input', handleWebsiteChange);
            }
        }
    }, [])

    const handleAvatarChange = (e) => {
        setAvatar(e.detail.sourceEvent.target.value);
    }
    const handleCoverChange = (e) => {
        setCover(e.detail.sourceEvent.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.detail.sourceEvent.target.value);
    }
    const handleAboutChange = (e) => {
        setAbout(e.detail.sourceEvent.target.value);
    }
    const handleLocationChange = (e) => {
        setLocation(e.detail.sourceEvent.target.value);
    }
    const handleWebsiteChange = (e) => {
        setWebsite(e.detail.sourceEvent.target.value);
    }

    const handleSubmit = () => {
        let tx = {
            profile: {
                about: about,
                cover_image: cover,
                location: location,
                name: name,
                profile_image: avatar,
                website: website
            }
        };
        store.updateProfile(authorInfo.name, JSON.stringify(tx));
    }

    const handleCancel = () => {
        setAvatar(authorInfo.avatar);
        setCover(authorInfo.cover);
        setName(authorInfo.name);
        setAbout(authorInfo.about);
        setLocation(authorInfo.location);
        setWebsite(authorInfo.website);
        handleEdit();
    }

    return (
        <div className={isEdited ? "edit flex col pa" : "hidden"}>
            <h3> Public Profile Settings </h3>
            <form className="edit-form pa" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className="avatar">
                    <label>Profile picture url</label>
                    { state === "pending" ?
                        <wired-input
                            disabled
                            type="text"
                            value={avatar}
                            ref={avatarInput}
                        />
                        :
                        <wired-input
                            type="text"
                            value={avatar}
                            ref={avatarInput}
                        />
                    }
                    
                    <p className="blue">Upload an image</p>
                </div>

                <div className="cover">
                    <label>Cover image url (Optimal: 2048x512 pixels)</label>
                    { state === "pending" ?
                        <wired-input
                            disabled
                            type="text"
                            value={cover}
                            ref={coverInput}
                        />
                        :
                        <wired-input
                            type="text"
                            value={cover}
                            ref={coverInput}
                        />
                    }
                    <p className="blue">Upload an image</p>
                </div>

                <div className="name">
                    <label>Display name</label>
                    { state === "pending" ?
                        <wired-input
                            disabled
                            type="text"
                            value={name}
                            ref={nameInput}
                        />
                        :
                        <wired-input
                            type="text"
                            value={name}
                            ref={nameInput}
                        />
                    }
                </div>

                <div className="about">
                    <label>About me</label>
                    { state === "pending" ?
                        <wired-textarea
                            disabled
                            rows="4"
                            type="text"
                            value={about}
                            ref={aboutInput}
                        />
                        :
                        <wired-textarea
                            rows="4"
                            type="text"
                            value={about}
                            ref={aboutInput}
                        />
                    }
                </div>

                <div className="location">
                    <label>Location</label>
                    { state === "pending" ?
                        <wired-input
                            disabled
                            type="text"
                            value={location}
                            ref={locationInput}
                        />
                        :
                        <wired-input
                            type="text"
                            value={location}
                            ref={locationInput}
                        />
                    }
                </div>

                <div className="website">
                    <label>Website</label>
                    { state === "pending" ?
                        <wired-input
                            disabled
                            type="text"
                            value={website}
                            ref={websiteInput}
                        />
                        :
                        <wired-input
                            type="text"
                            value={website}
                            ref={websiteInput}
                        />
                    }
                </div>

                {/*<div>
                            <p>Not safe for work (NSFW) content</p>
                            <input type="text"/>
                        </div>*/}
                <div className="pa">
                    <div className="flex row pa-hh">
                        <button type="submit" className="send-btn">Update</button>
                        <p className="pointer" onClick={handleCancel}>Cancel</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit;
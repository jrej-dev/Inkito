import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../../stores/appStore';
import { useAlert } from 'react-alert';

var ENDPOINT = "https://inkito-ipfs.herokuapp.com";
if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:5000";
}

const ProfileEdit = ({ isEdited, setEdited, authorInfo, state }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const [avatar, setAvatar] = useState(authorInfo.avatar);
    const [cover, setCover] = useState(authorInfo.cover);
    const [name, setName] = useState(authorInfo.displayName);
    const [about, setAbout] = useState(authorInfo.about);
    const [location, setLocation] = useState(authorInfo.location);
    const [website, setWebsite] = useState(authorInfo.website);

    const [imageLoading, setImageLoading] = useState(false);
    const [coverLoading, setCoverLoading] = useState(false);


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
    })

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

        if (about !== authorInfo.about || cover !== authorInfo.cover || location !== authorInfo.location || name !== authorInfo.displayName || avatar !== authorInfo.avatar || website !== authorInfo.website) {
            store.updateProfile(authorInfo.name, JSON.stringify(tx));
            if (state === "done") {
                setEdited(!isEdited);
                alert.success('Profile Udpated', {
                    timeout: 2000, // custom timeout just for this one alert
                })
            }
        } else {
            alert.show('No changes', {
                timeout: 2000, // custom timeout just for this one alert
            })
        }
    }

    const handleCancel = (e) => {
        setAvatar(authorInfo.avatar);
        setCover(authorInfo.cover);
        setName(authorInfo.name);
        setAbout(authorInfo.about);
        setLocation(authorInfo.location);
        setWebsite(authorInfo.website);
        setEdited(!isEdited);
    }

    const onCoverUpload = async (coverFile) => {
        if (coverFile) {
            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("file", coverFile, "file");
            formdata.append("hold_time", "12");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            setCoverLoading(true);
            const fetch_response = await fetch(`${ENDPOINT}/upload`, requestOptions)
                .then(res => res.json());
            setCoverLoading(false);
            const IpfsHash = fetch_response.IpfsHash;
            if (IpfsHash) {
                setCover(`https://gateway.ipfs.io/ipfs/${IpfsHash}`);
                coverInput.current.value = `https://gateway.ipfs.io/ipfs/${IpfsHash}`;
            } else {
                alert.error('Something went wrong.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
            }
        }
    }


    const onAvatarUpload = async (avatarFile) => {
        if (avatarFile) {
            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("file", avatarFile, "file");
            formdata.append("hold_time", "12");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            setImageLoading(true);
            const fetch_response = await fetch(`${ENDPOINT}/upload`, requestOptions)
                .then(res => res.json());
            setImageLoading(false);
            const IpfsHash = fetch_response.IpfsHash;
            if (IpfsHash) {
                setAvatar(`https://gateway.ipfs.io/ipfs/${IpfsHash}`);
                avatarInput.current.value = `https://gateway.ipfs.io/ipfs/${IpfsHash}`;
            } else {
                alert.error('Something went wrong.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
            }
        }
    }

    if (isEdited) {
        return (
            <div className="edit flex col pa">
                < h3 > Public Profile Settings </h3 >
                <div className="edit-form pa" >
                    <div className="avatar">
                        <label>Profile picture url</label>
                        {
                            state === "pending" ?
                                <wired-input
                                    disabled
                                    type="text"
                                    value={avatar || authorInfo.avatar}
                                    ref={avatarInput}
                                />
                                :
                                <wired-input
                                    type="text"
                                    value={avatar || authorInfo.avatar}
                                    ref={avatarInput}
                                />
                        }
                        {
                            imageLoading ?
                                <wired-spinner class="custom" spinning duration="1000" />
                                :
                                <form className="upload flex-start row wrap reset">
                                    <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => onAvatarUpload(e.target.files[0])} />
                                </form>
                        }
                    </div>

                    <div className="cover">
                        <div className="cover-label flex-start row wrap">
                            <label>Cover image url</label>
                            <label>(Optimal: 2048x512 pixels)</label>
                        </div>
                        {state === "pending" ?
                            <wired-input
                                disabled
                                type="text"
                                value={cover || authorInfo.cover}
                                ref={coverInput}
                            />
                            :
                            <wired-input
                                type="text"
                                value={cover || authorInfo.cover}
                                ref={coverInput}
                            />
                        }
                        {
                            coverLoading ?
                                <wired-spinner class="custom" spinning duration="1000" />
                                : <form className="upload flex-start row wrap reset">
                                    <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => onCoverUpload(e.target.files[0])} />
                                </form>
                        }
                    </div>

                    <div className="name">
                        <label>Display name</label>
                        {state === "pending" ?
                            <wired-input
                                disabled
                                type="text"
                                value={name || authorInfo.name}
                                ref={nameInput}
                            />
                            :
                            <wired-input
                                type="text"
                                value={name || authorInfo.name}
                                ref={nameInput}
                            />
                        }
                    </div>

                    <div className="about">
                        <label>About me</label>
                        {state === "pending" ?
                            <wired-textarea
                                disabled
                                rows="6"
                                type="text"
                                value={about || authorInfo.about}
                                ref={aboutInput}
                            />
                            :
                            <wired-textarea
                                rows="6"
                                type="text"
                                value={about || authorInfo.about}
                                ref={aboutInput}
                            />
                        }
                    </div>

                    <div className="location">
                        <label>Location</label>
                        {state === "pending" ?
                            <wired-input
                                disabled
                                type="text"
                                value={location || authorInfo.location}
                                ref={locationInput}
                            />
                            :
                            <wired-input
                                type="text"
                                value={location || authorInfo.location}
                                ref={locationInput}
                            />
                        }
                    </div>

                    <div className="website">
                        <label>Website</label>
                        {state === "pending" ?
                            <wired-input
                                disabled
                                type="text"
                                value={website || authorInfo.website}
                                ref={websiteInput}
                            />
                            :
                            <wired-input
                                type="text"
                                value={website || authorInfo.website}
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
                            <button className="send-btn white" onClick={handleSubmit}>Update</button>
                            <p className="pointer" onClick={handleCancel}><button className="hide">Cancel</button></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

export default ProfileEdit;
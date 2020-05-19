import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import { useAlert } from 'react-alert';

const ProfileEdit = ({ isEdited, handleEdit, authorInfo, state }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const [avatar, setAvatar] = useState(authorInfo.avatar);
    const [cover, setCover] = useState(authorInfo.cover);
    const [name, setName] = useState(authorInfo.displayName);
    const [about, setAbout] = useState(authorInfo.about);
    const [location, setLocation] = useState(authorInfo.location);
    const [website, setWebsite] = useState(authorInfo.website);

    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

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
                handleEdit();
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
        handleEdit();
    }

    const onCoverUpload = async () => {
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
            
            const fetch_response = await fetch('https://inkito-ipfs.herokuapp.com/upload', requestOptions);
            console.log(fetch_response);
            const body = await fetch_response.text();

            setCover(`https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`);
            coverInput.current.value = `https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`;
        }
    }


    const onAvatarUpload = async () => {
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
            const fetch_response = await fetch('https://inkito-ipfs.herokuapp.com/upload', requestOptions);
            const body = await fetch_response.text();

            setAvatar(`https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`);
            avatarInput.current.value = `https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`;
        }
    }

    return (
        <div className={isEdited ? "edit flex col pa" : "hidden"}>
            <h3> Public Profile Settings </h3>
            <div className="edit-form pa" >
                <div className="avatar">
                    <label>Profile picture url</label>
                    {state === "pending" ?
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
                    {
                        store.ipfsState ?
                        <form className="upload flex-start row wrap reset">
                            <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => setAvatarFile(e.target.files[0])} />
                            <p className="blue" onClick={onAvatarUpload}>Upload file</p>
                        </form>
                        :
                        ""
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
                    {
                        store.ipfsState ?
                        <form className="upload flex-start row wrap reset">
                            <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => setCoverFile(e.target.files[0])} />
                            <p className="blue" onClick={onCoverUpload}>Upload file</p>
                        </form>
                        :
                        ""
                    }
                </div>

                <div className="name">
                    <label>Display name</label>
                    {state === "pending" ?
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
                    {state === "pending" ?
                        <wired-textarea
                            disabled
                            rows="6"
                            type="text"
                            value={about}
                            ref={aboutInput}
                        />
                        :
                        <wired-textarea
                            rows="6"
                            type="text"
                            value={about}
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
                    {state === "pending" ?
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
                        <button className="send-btn" onClick={handleSubmit}>Update</button>
                        <p className="pointer" onClick={handleCancel}>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit;
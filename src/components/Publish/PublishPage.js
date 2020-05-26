import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import StoreContext from '../../stores/AppStore';
import { Link } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { useAlert } from 'react-alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DownArrow from '../Icons/down-arrow.png';
//import Bubble from '../Icons/bubble.png';
import Heart from '../Icons/heart.png';

import Nav from '../Main/Nav';
import '../../sass/components/Publish.scss';

const PublishPage = ({ publishState }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();
    const location = useLocation();

    const [series, setSeries] = useState(location.state && location.state.series ? location.state.series : "new");
    const [type, setType] = useState(location.state && location.state.type ? location.state.type : "comic");
    const [images, setImages] = useState(location.state && location.state.seriesInfo ? typeof location.state.seriesInfo.image === "string" ? [location.state.seriesInfo.image] : [...JSON.parse(location.state.seriesInfo.json_metadata).image] : []);
    const [imageFile, setImageFile] = useState(null);
    const [imageLink, setImageLink] = useState("");
    const [imageLinkIsActive, setimageLinkIsActive] = useState(false);
    const [title, setTitle] = useState(location.state && location.state.seriesInfo ? location.state.seriesInfo.title : "");
    const [description, setDescription] = useState(location.state && location.state.seriesInfo ? type === "comic" ? location.state.seriesInfo.body.replace(/^!\[.*\)./gm, '') : location.state.seriesInfo.body : "");
    const [tags, setTags] = useState(location.state && location.state.seriesInfo ? JSON.parse(location.state.seriesInfo.json_metadata).tags.join(" ").replace(`inkito-${type}s`, "").replace(JSON.parse(location.state.seriesInfo.json_metadata).tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0], "") : "");
    const [categories, setCategories] = useState([]);

    const seriesSelected = useRef(null);
    const typeSelected = useRef(null);
    const imageLinkInput = useRef(null);
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagsInput = useRef(null);

    var props = {};

    if (publishState === "done") {
        alert.success('Episode published.', {
            timeout: 2000, // custom timeout just for this one alert
        })
        setTimeout(function () { window.location.reload(); }, 2200);
    } else if (publishState === "error") {
        alert.error('Something went wrong.', {
            timeout: 2000, // custom timeout just for this one alert
        })
    }

    useEffect(() => {

        getUrlParams();
        getLocationInfo();
        var currentSeries = seriesSelected.current;
        var currentType = typeSelected.current;
        var currentImageLink = imageLinkInput.current;
        var currentTitle = titleInput.current;
        var currentDescription = descriptionInput.current;
        var currentTags = tagsInput.current;

        if (currentSeries) {
            currentSeries.addEventListener('selected', handleSeriesChange);
        }
        if (currentType) {
            currentType.addEventListener('selected', handleTypeChange);
        }
        if (currentImageLink) {
            currentImageLink.addEventListener('input', handleImageLinkChange);
        }
        if (currentTitle) {
            currentTitle.addEventListener('input', handleTitleChange);
        }
        if (currentDescription) {
            currentDescription.addEventListener('input', handleDescriptionChange);
        }
        if (currentTags) {
            currentTags.addEventListener('input', handleTagsChange);
        }


        return () => {
            store.toggleNavMenu(false);
            store.resetSeriesDetail();
            dispose();

            if (currentSeries) {
                currentSeries.removeEventListener('selected', handleSeriesChange);
            }
            if (currentType) {
                currentType.removeEventListener('selected', handleTypeChange);
            }
            if (currentImageLink) {
                currentImageLink.removeEventListener('input', handleImageLinkChange);
            }
            if (currentTitle) {
                currentTitle.removeEventListener('input', handleTitleChange);
            }
            if (currentDescription) {
                currentDescription.removeEventListener('input', handleDescriptionChange);
            }
            if (currentTags) {
                currentTags.removeEventListener('input', handleTagsChange);
            }
        }
    }, [])

    const dispose = () => {
        SeriesCombo = () => { return [] };
    }

    const getLocationInfo = async () => {
        if (location.state && location.state.dashboard) {
            await store.fetchPermlinks(location.state.seriesInfo.author, location.state.seriesInfo.title.split(" ").join("").toLowerCase());
            if (toJS(store.seriesLinks)) {
                fetchSeriesDetail();
            }
        }
    }

    const getUrlParams = () => {
        props.user = new URLSearchParams(document.location.search).get('user');
        if (props.user) {
            fetchAuthoInfo(props.user);
        }
    }

    const fetchSeriesDetail = (index) => {
        toJS(store.seriesLinks).forEach((permlink, index) => {
            store.fetchSeriesDetail(props.user, permlink, index)
        })
        if (index) {
            store.fetchSeriesDetail(props.user, toJS(store.seriesLinks)[index], index)
        }
    }

    const fetchAuthoInfo = (user) => {
        if (toJS(store.authorInfo) && toJS(store.authorInfo).name !== user) {
            store.fetchAuthoInfo(user);
        } else if (toJS(store.authorInfo).length === 0) {
            store.fetchAuthoInfo(user);
        }
    }

    const handleSeriesChange = (e) => {
        setSeries(e.detail.selected);
        setImages([]);
    }
    const handleTypeChange = (e) => {
        setType(e.detail.selected);
        setSeries("new");
        seriesSelected.current.value = { value: "new", text: "New Series" }
    }
    const handleImageLinkChange = (e) => {
        setImageLink(e.detail.sourceEvent.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.detail.sourceEvent.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.detail.sourceEvent.target.value);
    }
    const handleTagsChange = (e) => {
        setTags(e.detail.sourceEvent.target.value);
    }
    const handleCatChange = (e) => {
        if (e.target.checked === false && categories.length < 3 && !categories.includes(e.target.innerText)) {
            setCategories([...categories, e.target.innerText])
        } else if (categories.length > 0 && e.target.checked === true) {
            let arr = [...categories];
            arr = arr.filter(cat => cat !== e.target.innerText);
            setCategories(arr);
        }
    }

    const onImageUpload = async () => {
        if (imageFile) {
            if (series === "new" && images.length >= 1) {
                alert.show('There can only be one thumbnail.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
                setTimeout(function () { imageLinkInput.current.value = ""; }, 2200);
            } else if (!store.ipfsState) {
                alert.error('Something went wrong.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
                setTimeout(function () { imageLinkInput.current.value = ""; }, 2200);
            } else {
                var myHeaders = new Headers();

                var formdata = new FormData();
                formdata.append("file", imageFile, "file");
                formdata.append("hold_time", "12");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };
                const fetch_response = await fetch('https://inkito-ipfs.herokuapp.com/upload', requestOptions);
                const body = await fetch_response.text();

                setImages([...images, `https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`]);
            }
        }
    }

    let SeriesCombo = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo) && toJS(store.authorInfo).series) {
                let combo = [];
                toJS(store.authorInfo).series.forEach(series => {
                    combo.push(<wired-item value={series.title} key={series.seriesId} type={series.tags.includes("inkito-comics") ? "comic" : "novel"}>{series.title}</wired-item>)
                })
                if (location.state && location.state.series) {
                    combo = combo.filter(series => series.props.value !== location.state.series)
                }
                combo = combo.filter(series => series.props.type === type)
                return combo;
            } else {
                return []
            }
        })
    }

    const compareDate = (contentDate) => {
        var g1 = new Date().toISOString().substring(0, 10);
        var g2 = contentDate;
        if (g1 >= g2) {
            g1 = g1.split("-");
            g2 = g2.split("-");
            var g3 = [g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]]
            if (g3[0] > 0) {
                return g3[0] === 1 ? `${g3[0]} year ago` : `${g3[0]} years ago`;
            } else if (g3[1] > 0) {
                return g3[1] === 1 ? `${g3[1]} month ago` : `${g3[1]} months ago`;
            } else if (g3[2] > 0) {
                return g3[2] === 1 ? `${g3[2]} day ago` : `${g3[2]} days ago`;
            }
        }
    }

    let EpisodeList = () => {
        return useObserver(() => {
            if (toJS(store.seriesDetail) && !toJS(store.seriesDetail).includes(undefined)) {
                let episodes = [];
                toJS(store.seriesDetail).forEach((episode, index) => {
                    if (episode === undefined) {
                        fetchSeriesDetail(index);
                    }
                    if (index > 0) {
                        let reward = episode.pending_payout_value ? episode.pending_payout_value === "0.000 HBD" ? episode.total_payout_value.replace("HBD", "") : episode.pending_payout_value.replace("HBD", "") : "?";
                        episodes.push(
                            <Link key={episode.permlink} to={`/${type}Reader/${JSON.parse(location.state.seriesInfo.json_metadata).tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0].replace("-", "/")}/${index}`}>
                                <div className="episode flex-between row">
                                    <div className="flex row pa-hh">
                                        <p>#{index}</p>
                                        <div className="title-block">
                                            <h3>{episode.title}</h3>
                                            <p>{compareDate(episode.created.slice(0, 10))}</p>
                                        </div>
                                    </div>
                                    <div className="flex row pa-h">
                                        <div className="reward-block flex">
                                            <p>$ {(parseInt(reward, 10) / 2).toFixed(2)}</p>
                                            <img className="md-icon down-arrow" src={DownArrow} alt="down-arrow" />
                                        </div>
                                        <div className="vote-block flex">
                                            <p>{episode.active_votes.length}</p>
                                            <img className="md-icon down-arrow" src={Heart} alt="down-arrow" />
                                        </div>
                                        {/*<div className="comment-block flex">
                                            <p>{episode.replies.length}</p>
                                            <img className="md-icon down-arrow" src={Bubble} alt="down-arrow" />
                                        </div>
                                        <Link to={{
                                            pathname: `/publish?user=${props.user}`,
                                            state: {
                                                type: type,
                                                seriesInfo: episode,
                                                series: episode.title,
                                            }
                                        }}
                                        >
                                            <p>Edit</p>
                                        </Link>*/}
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                })
                if (episodes.length > 0) {
                    episodes.push(<Link key="add-episode" to={{
                        pathname: `/publish?user=${props.user}`,
                        state: {
                            type: type,
                            series: series
                        }
                    }}>
                        <button className="add-ep-btn w-90" onClick={() => { window.location.reload() }}>
                            Add Episode
                        </button>
                    </Link>);
                    return episodes;
                } else {
                    return <p>No episodes... yet</p>
                }
            } else {
                fetchSeriesDetail();
                return <wired-spinner class="custom" spinning duration="1000" />
            }
        })
    }

    const handleImageDelete = (index) => {
        let arr = [...images];
        arr.splice(index, 1);
        setImages(arr);
    }

    const addImageLink = (e) => {
        e.preventDefault();
        if (imageLink) {
            if (series === "new" && images.length > 0) {
                alert.show('There can only be one thumbnail.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
                setTimeout(function () { imageLinkInput.current.value = ""; }, 2200);
            } else {
                setImages([...images, imageLink])
                imageLinkInput.current.value = "";
            }
        }
    }

    const toggleImageLink = () => {
        setimageLinkIsActive(!imageLinkIsActive);
        imageLinkInput.current.value = "";
    }

    const Row = ({ image, index }) => {
        return (
            <Draggable draggableId={image} index={index}>
                {(provided) => {
                    return <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}><td className="flex row pa-h"><div>{index + 1 + "."}</div><div>{image}</div></td><td className="delete flex pointer" onClick={() => { handleImageDelete(index) }}>X</td></tr>
                }}
            </Draggable>
        )
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        };

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        };

        const newImages = Array.from(images);
        newImages.splice(source.index, 1);
        newImages.splice(destination.index, 0, draggableId);

        setImages(newImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let tagList = [];
        let seriesId = "";
        if (series === "new") {
            seriesId = props.user.toLowerCase() + "-" + title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            if (seriesId.length > 24) {
                seriesId = seriesId.slice(0, 24);
            }
        } else {
            if (location.state && location.state.seriesInfo) {
                seriesId = JSON.parse(location.state.seriesInfo.json_metadata).tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0];
            } else {
                let seriesInfo = toJS(store.authorInfo).series.filter(serie => serie.title === series)
                seriesId = seriesInfo[0].seriesId;
            }
        }

        if (tags) {
            tagList = tags.split(" ");
            tagList = tagList.filter(tag => tag !== '');
        }
        if (type === "comic") {
            tagList.unshift("inkito-comics", seriesId);
        } else if (type === "novel") {
            tagList.unshift("inkito-novels", seriesId);
        }
        if (categories.length > 0) {
            let catList = categories.map(cat => cat.split(" ").join("").toLowerCase());
            tagList = [...tagList, ...catList];
        }
        if (tagList.length > 5) {
            let overFlow = tagList.length - 5;
            tagList.splice(-1, overFlow);
        }

        let parentAuthor = "";
        let parentPermlink = tagList[0];
        const author = toJS(store.userDetail).user;
        let permlink = ""
        let jsonMetadata = {};
        let body = ""

        if (location.state && location.state.seriesInfo) {
            permlink = location.state.seriesInfo.permlink;
            parentAuthor = location.state.seriesInfo.parent_author;
            parentPermlink = location.state.seriesInfo.parent_permlink;
            jsonMetadata = JSON.parse(location.state.seriesInfo.json_metadata);
            jsonMetadata.tags = tagList;
            jsonMetadata.image = images;

        } else {
            permlink = title.split(" ").join("-").toLowerCase() + Date.now();
            jsonMetadata = { tags: tagList, format: 'markdown', image: images, app: 'Inkito' }
        }

        if (images.length > 0) {
            let imageMarkdown = [];
            images.forEach((image, index) => imageMarkdown.push(`![image ${index + 1}](${image})`))
            body = imageMarkdown.join(" ") + " " + description
        } else {
            body = description;
        }

        if (title && description && toJS(store.userDetail) && toJS(store.userDetail).user) {
            console.log(author);
            if (type === "novel" && series !== "new") {
                if (location.state && location.state.seriesInfo) {
                    store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, undefined, true);
                } else {
                    store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata);
                }
            } else if (images.length > 0) {
                if (location.state && location.state.seriesInfo) {
                    store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, undefined, true);
                } else {
                    store.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata);
                }
            }
        } else if (toJS(store.userDetail) && toJS(store.userDetail).user === undefined) {
            alert.show('Please login first');
        } else {
            alert.show('Please fill in required fields', {
                timeout: 2000, // custom timeout just for this one alert
            });
        }
    }

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>Inkito | Publish Page</title>
            </Helmet>
            <div className="publish">
                <Nav />
                <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                    <div className="publish-page">
                        {location.state && location.state.seriesInfo ?
                            location.state.dashboard ?
                                <h2>Series Dashboard</h2>
                                :
                                <h2>Update Episode</h2>
                            :
                            series === "new" ?
                                <h2>New Series</h2>
                                :
                                <h2>New Episode</h2>
                        }
                        <form>
                            <div className="divider" />

                            <div className="series flex-between row wrap w-90 pa">
                                <div className="series-select flex row wrap pa-h">
                                    <h2>Select Series</h2>
                                    {location.state && location.state.seriesInfo ?
                                        <wired-combo disabled selected={series} ref={seriesSelected}>
                                            <wired-item value="new">New Series</wired-item>
                                            {
                                                type === location.state.type ?
                                                    <wired-item value={location.state.series} type={location.state.type}>{location.state.series}</wired-item>
                                                    :
                                                    ""
                                            }
                                            <SeriesCombo />
                                        </wired-combo>
                                        :
                                        location.state && location.state.series && location.state.type ?
                                            <wired-combo selected={series} ref={seriesSelected}>
                                                <wired-item value="new">New Series</wired-item>
                                                {
                                                    type === location.state.type ?
                                                        <wired-item value={location.state.series} type={location.state.type}>{location.state.series}</wired-item>
                                                        :
                                                        ""
                                                }
                                                <SeriesCombo />
                                            </wired-combo>
                                            :
                                            <wired-combo selected={series} ref={seriesSelected}>
                                                <wired-item value="new">New Series</wired-item>
                                                <SeriesCombo />
                                            </wired-combo>

                                    }
                                </div>
                                <div className="type-select flex row pa-h">
                                    {
                                        location.state && location.state.seriesInfo ?
                                            <wired-radio-group selected={type} ref={typeSelected}>
                                                <wired-radio
                                                    name="comic"
                                                    disabled
                                                >
                                                    Comic
                                        </wired-radio>
                                                <wired-radio
                                                    name="novel"
                                                    disabled
                                                >
                                                    Novel
                                        </wired-radio>
                                            </wired-radio-group>
                                            :
                                            <wired-radio-group selected={type} ref={typeSelected}>
                                                <wired-radio
                                                    name="comic"
                                                    checked
                                                >
                                                    Comic
                                        </wired-radio>
                                                <wired-radio
                                                    name="novel"
                                                >
                                                    Novel
                                        </wired-radio>
                                            </wired-radio-group>
                                    }
                                </div>
                            </div>

                            <div className="divider" />

                            <div className="w-90 pa">
                                <div className={type === "novel" && series !== "new" ? "hidden" : "flex-start row pa-h"}>
                                    {
                                        series === "new" ?
                                            <h2>Series Thumbnail</h2>
                                            :
                                            <h2>Images</h2>

                                    }
                                    <p>(Maximum file size of 2MB)</p>
                                </div>

                                <div className={imageLinkIsActive ? "imageLink" : "imageLink hidden-top"}>
                                    <div className="close pointer" onClick={toggleImageLink}> Close </div>
                                    <label className="reset"><h3>Add Image</h3></label>
                                    <wired-input
                                        placeholder="Image link"
                                        value={imageLink}
                                        ref={imageLinkInput}
                                    />
                                    <button onClick={addImageLink}>Add</button>
                                </div>

                                <div className={type === "novel" && series !== "new" ? "hidden" : "flex col"}>
                                    <table border="1" rules="none">
                                        {images.length > 0 ?
                                            <DragDropContext onDragEnd={onDragEnd}>
                                                <Droppable droppableId="imageTable">
                                                    {(provided) => (
                                                        <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                                            {images.map((image, index) =>
                                                                <Row key={index + "-" + image} index={index} image={image} />
                                                            )}
                                                            {provided.placeholder}
                                                        </tbody>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                            :
                                            <tbody>
                                                <tr key="default-image"><td>No Images... yet</td></tr>
                                            </tbody>
                                        }
                                    </table>
                                </div>

                                <div className={type === "novel" && series !== "new" ? "hidden" : "upload flex-start wrap row pa-h"}>
                                    <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => { setImageFile(e.target.files[0]) }} />
                                    <div className="buttons flex-between">
                                        <p className="blue" onClick={onImageUpload}>Upload file</p>
                                        <p className="blue" onClick={toggleImageLink}>Upload from link</p>
                                    </div>
                                </div>

                                <div className="input title pa-h">

                                    <label className="flex">
                                        {
                                            series === "new" ?
                                                <h2>Series Title</h2>
                                                :
                                                location.state && location.state.dashboard ?
                                                    <h2>Series Title</h2>
                                                    :
                                                    <h2>Episode Title</h2>
                                        }
                                    </label>

                                    <wired-input
                                        type="text"
                                        value={title}
                                        ref={titleInput}
                                        placeholder="Enter your title"
                                    />
                                </div>

                                {type === "comic" ?
                                    <div className="input description pa-h">
                                        <label className="flex row wrap pa-h">
                                            <h2>Description</h2>
                                            <a
                                                href="https://guides.github.com/features/mastering-markdown"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Markdown styling guide"
                                            >
                                                Markdown Styling guide
                                        </a>
                                        </label>
                                        <wired-textarea
                                            rows="10"
                                            type="text"
                                            value={description}
                                            ref={descriptionInput}
                                            placeholder="Write a description..."
                                        />
                                    </div>
                                    :
                                    <div className="input description pa-h">
                                        <label className="flex row wrap pa-h">
                                            <h2>Episode Body</h2>
                                            <a
                                                href="https://guides.github.com/features/mastering-markdown"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Markdown styling guide"
                                            >
                                                Markdown Styling guide
                                        </a>
                                        </label>
                                        <wired-textarea
                                            rows="40"
                                            type="text"
                                            value={description}
                                            placeholder="Write your story..."
                                            ref={descriptionInput}
                                        />
                                    </div>
                                }

                                {
                                    series === "new" ?
                                        <div className="input tags pa-h">
                                            <label className="flex row"><h2>Categories</h2> <div className="pa-h"><p>(3 categories max)</p></div></label>
                                            <div className="flex wrap pa">
                                                {store.categories.filter(cat => cat !== "All Categories").map(category => {
                                                    if (categories.length >= 3) {
                                                        if (categories.includes(category)) {
                                                            return <wired-checkbox key={category} onClick={handleCatChange}>{category}</wired-checkbox>
                                                        } else {
                                                            return <wired-checkbox disabled key={category} onClick={handleCatChange}>{category}</wired-checkbox>
                                                        }
                                                    } else {
                                                        return <wired-checkbox key={category} onClick={handleCatChange}>{category}</wired-checkbox>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        :
                                        <div className="input tags pa-h">
                                            <label className="flex row"><h2>Tags</h2> <div className="pa-h"><p>(3 tags max)</p></div></label>
                                            <wired-input
                                                type="text"
                                                value={tags}
                                                placeholder="Enter tags separated by spaces"
                                                ref={tagsInput}
                                            />
                                        </div>
                                }
                            </div>

                            <div className="divider" />

                            {
                                location.state && location.state.dashboard ?
                                    <React.Fragment>
                                        <div className="input ep-list pa-h w-90">
                                            <label className="flex row"><h2>Episode List</h2></label>
                                            <EpisodeList />
                                        </div>
                                        <div className="divider" />
                                    </React.Fragment>
                                    :
                                    ""
                            }

                            <div className="end flex row">
                                <div className="rules reset pa-h">
                                    <h3>
                                        Please follow the rules
                                </h3>
                                    <p>
                                        By submitting your comics or novels you agree to Inkito's Terms of Service and Privacy Policy. Please do not violate the copyright or privacy of others.
                                </p>
                                </div>
                                <div className="flex row pa">
                                    {/*<p className="blue">Preview</p>*/}
                                    {publishState === "pending" ?
                                        <wired-spinner class="custom" spinning duration="1000" />
                                        :
                                        location.state && location.state.seriesInfo ?
                                            <button className="publish-btn" onClick={handleSubmit}> Update </button>
                                            :
                                            < button className="publish-btn" onClick={handleSubmit}> Publish</button>

                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}

export default PublishPage;

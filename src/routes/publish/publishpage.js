import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import StoreContext from '../../stores/appStore';
import { Link } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { useAlert } from 'react-alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { compareDate } from '../../utilities/comparedate';

import DownArrow from '../../assets/icons/down-arrow.png';
import Heart from '../../assets/icons/heart.png';

import './publish.scss';

var ENDPOINT = "https://inkito-ipfs.herokuapp.com";
if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:5000";
}

const PublishPage = () => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();
    const location = useLocation();
    const [series, setSeries] = useState(location.state && location.state.series ? location.state.series : "new");
    const [type, setType] = useState(location.state && location.state.type ? location.state.type : "comic");
    const [imageLink, setImageLink] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [imageLinkIsActive, setimageLinkIsActive] = useState(false);
    const [categories, setCategories] = useState([]);
    let publishState = store.commentState;

    //Edit exisiting page
    let descriptionImages = [];
    let bodyFiltered = "";
    let tagsFiltered = "";

    if (location.state && location.state.seriesInfo) {
        //Filtering images
        descriptionImages = location.state.seriesInfo.body.match(/^!\[.*\)|^--.*-$|^\*\*.*\*$|^__.*_$|<hr\/>/gm)
        let hrIndex = -1;
        descriptionImages.forEach((image, index) => {
            if (image.includes("---") || image.includes("___") || image.includes("***") || image.includes("<hr/>")) {
                hrIndex = index;
            }
        });
        if (hrIndex > 0) {
            descriptionImages = descriptionImages.slice(0, hrIndex)
        }

        //Filtering description/body
        bodyFiltered = location.state.seriesInfo.body;
        descriptionImages.forEach(image => { bodyFiltered = bodyFiltered.replace(image, '') })
        bodyFiltered = bodyFiltered.replace(/(^--.*-$|^\*\*.*\*$|^__.*_$|<hr\/>)/m, '').replace(/<center>\[!\[inkito-banner.png\].*\n*<\/center>$/gm, '').trim()

        //Filtering tags
        tagsFiltered = location.state.seriesInfo.last_update.tags.join(" ").replace(`inkito-${type}s`, "").replace(location.state.seriesInfo.last_update.tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0], "").trim()
    }

    const [images, setImages] = useState(location.state && location.state.seriesInfo ? typeof location.state.seriesInfo.image === "string" ? [location.state.seriesInfo.image] : [...descriptionImages.map(image => image.match(/http.*[a-zA-Z0-9_.-]/g)[0])] : []);
    const [title, setTitle] = useState(location.state && location.state.seriesInfo ? location.state.seriesInfo.title : "");
    const [description, setDescription] = useState(location.state && location.state.seriesInfo ? type === "comic" ? bodyFiltered : location.state.seriesInfo.body : "");
    const [tags, setTags] = useState(location.state && location.state.seriesInfo ? tagsFiltered : "");

    //useRef for wired-js elements
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
        setTimeout(function () { console.log("reload"); window.location.reload(); }, 2200);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            fetchAuthorInfo(props.user);
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

    const fetchAuthorInfo = (user) => {
        if (toJS(store.authorInfo) && toJS(store.authorInfo).name !== user) {
            store.fetchAuthorInfo(user);
        } else if (toJS(store.authorInfo).length === 0) {
            store.fetchAuthorInfo(user);
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

    const onImageUpload = async (imageFile) => {
        if (imageFile) {
            if (series === "new" && images.length >= 1) {
                alert.show('There can only be one thumbnail.', {
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
                setImageLoading(true);
                const fetch_response = await fetch(`${ENDPOINT}/upload`, requestOptions).then(res => res.json());
                setImageLoading(false);
                const IpfsHash = fetch_response.IpfsHash;
                if (IpfsHash) {
                    setImages([...images, `https://gateway.ipfs.io/ipfs/${IpfsHash}`]);
                } else {
                    alert.error('Something went wrong.', {
                        timeout: 2000, // custom timeout just for this one alert
                    })
                }
            }
        }
    }

    let SeriesCombo = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo) && toJS(store.authorInfo).series && toJS(store.authorInfo).series.length > 0) {
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
                            <Link key={episode.permlink} to={`/${type}Reader/${location.state.seriesInfo.tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0].replace("-", "/")}/${index}`}>
                                <div className="episode flex-between row wrap">
                                    <div className="flex row pa-hh">
                                        <p>#{index}</p>
                                        <div className="title-block white-wrap">
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
                        <button className="add-ep-btn w-90 white" onClick={() => { window.location.reload() }}>
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
                seriesId = location.state.seriesInfo.last_update.tags.filter(tag => tag.includes(`${location.state.seriesInfo.author}-`))[0];
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
            tagList.unshift("art", "comics", "drawing", "inkito-comics", seriesId);
        } else if (type === "novel") {
            tagList.unshift("fiction", "story", "writing", "inkito-novels", seriesId);
        }
        if (categories.length > 0) {
            let catList = categories.map(cat => cat.split(" ").join("").toLowerCase());
            tagList = [...tagList, ...catList];
        }
        if (tagList.length > 10) {
            let overFlow = tagList.length - 10;
            tagList.splice(-1, overFlow);
        }

        let parentAuthor = "";
        let parentPermlink = tagList[0];
        const author = toJS(store.userDetail).user;
        let permlink = ""
        let jsonMetadata = { tags: tagList, format: 'markdown', image: images, app: 'Inkito' };
        let body = ""

        if (location.state && location.state.seriesInfo) {
            permlink = location.state.seriesInfo.permlink;
            parentAuthor = location.state.seriesInfo.parent_author;
            parentPermlink = location.state.seriesInfo.parent_permlink;
        } else {
            permlink = title.split(" ").join("-").toLowerCase() + Date.now();
        }

        if (images.length > 0) {
            let imageMarkdown = [];
            images.forEach((image, index) => imageMarkdown.push(`![image ${index + 1}](${image})`))
            body = imageMarkdown.join(" ").concat("  ").concat(`<hr/>`).concat(description).concat("  ").concat(`<center>[![inkito-banner.png](https://images.hive.blog/DQmXcA3xhDNEaesBeRzy3eq3Jw1zyGQEjzHY1DPc84P7peA/inkito-banner.png)](https://inkito.io/${type}Reader/${seriesId.replace("-", "/")})</center>`)
        } else {
            body = description;
        }

        if (title && description && toJS(store.userDetail) && toJS(store.userDetail).user) {
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

    return useObserver(() => {
        return (
            <>
                <Helmet>
                    <html lang="en" />
                    <title>Inkito | Publish Page</title>
                </Helmet>
                <div className="publish">
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
                                    <div className={type === "novel" && series !== "new" ? "hidden" : "flex-start row pa-h wrap title"}>
                                        {
                                            series === "new" ?
                                                <h2>Series Thumbnail</h2>
                                                :
                                                <h2>Images</h2>

                                        }
                                        <div className="white-wrap">
                                            <p>(Maximum file size of 2MB)</p>
                                        </div>
                                    </div>

                                    <div className={imageLinkIsActive ? "imageLink" : "imageLink hidden-top"}>
                                        <div className="close pointer" onClick={toggleImageLink}> Close </div>
                                        <label className="reset"><h3>Add Image</h3></label>
                                        <wired-input
                                            placeholder="Image link"
                                            value={imageLink}
                                            ref={imageLinkInput}
                                        />
                                        <button className="white" onClick={addImageLink}>Add</button>
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
                                        {
                                            imageLoading ?
                                                <wired-spinner class="custom" spinning duration="1000" />
                                                : <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => { onImageUpload(e.target.files[0]) }} />
                                        }
                                        <div className="buttons flex-between">
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
                                                <label className="flex row"><h2>Categories</h2> <div className="pa-h"><p>(5 categories max)</p></div></label>
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
                                                <label className="flex row"><h2>Tags</h2> <div className="pa-h"><p>(5 tags max)</p></div></label>
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
                                    <div className="rules reset pa-h white-wrap">
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
                                                <button className="publish-btn white" onClick={handleSubmit}> Update </button>
                                                :
                                                < button className="publish-btn white" onClick={handleSubmit}> Publish</button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </>
        );
    })
}

export default PublishPage;

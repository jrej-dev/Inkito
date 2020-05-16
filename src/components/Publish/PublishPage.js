import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
//import { useObserver } from 'mobx-react';
//import { toJS } from 'mobx';
import { useAlert } from 'react-alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Nav from '../Main/Nav';
import '../../sass/components/Publish.scss';

const PublishPage = ({ publishType }) => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const [series, setSeries] = useState("new");
    const [type, setType] = useState("comic");
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageLink, setImageLink] = useState("");
    const [imageLinkIsActive, setimageLinkIsActive] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [categories, setCategories] = useState([]);


    const seriesSelected = useRef(null);
    const typeSelected = useRef(null);
    const imageLinkInput = useRef(null);
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagsInput = useRef(null);

    var props = {};

    useEffect(() => {
        if (publishType) {
            if (publishType === "comic") {
                setType("comic");
            } else if (publishType === "novel") {
                setType("novel");
            }
        }
        getUrlParams();

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
    })

    const handleSeriesChange = (e) => {
        setSeries(e.detail.selected);
        setImages([]);
    }
    const handleTypeChange = (e) => {
        setType(e.detail.selected);
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
        } else if (categories.length > 0 && e.target.checked === true){
            let arr = [...categories];
            arr = arr.filter(cat => cat !== e.target.innerText);
            setCategories(arr);
        }
    }
    const onImageUpload = async () => {
        /*if (imageFile) {*/
            if (series === "new" && images.length > 0){
                alert.show('There can only be one thumbnail.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
                setTimeout(function(){ imageLinkInput.current.value = ""; }, 2200);
            } else {
                /*var myHeaders = new Headers();

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

                setImages([...images,`https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`]);*/
                //avatarInput.current.value = `https://gateway.ipfs.io/ipfs/${JSON.parse(body).response}`;
            
                setImages([...images, "https://gateway.ipfs.io/ipfs/test"]);
            }
        /*}*/
    }

    const getUrlParams = () => {
        props.series_id = new URLSearchParams(document.location.search).get('new');
        props.permlink = new URLSearchParams(document.location.search).get('edit');
    }

    const SeriesCombo = () => {
        let arr = ["test", "test2"]
        let combo = [];
        arr.forEach(series => {
            combo.push(<wired-item value={series} key={series}>{series}</wired-item>)
        })
        return combo;
    }

    const handleImageDelete = (index) => {
        let arr = [...images];
        arr.splice(index, 1);
        setImages(arr);
    }

    const addImageLink = (e) => {
        e.preventDefault();
        if (imageLink){
            if (imageLink.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                if (series === "new" && images.length > 0){
                    alert.show('There can only be one thumbnail.', {
                        timeout: 2000, // custom timeout just for this one alert
                    })
                    setTimeout(function(){ imageLinkInput.current.value = ""; }, 2200);
                } else {
                    setImages([...images, imageLink])
                    imageLinkInput.current.value = "";
                }
            } else {
                alert.error('Please enter a valid image url.', {
                    timeout: 2000, // custom timeout just for this one alert
                })
                setTimeout(function(){ imageLinkInput.current.value = ""; }, 2200);
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
        console.log(categories);
        if (images.length > 0 && title && description) {
            console.log("ready to send")
        } else {
            alert.show('Please fill in required fields', {
                timeout: 2000, // custom timeout just for this one alert
            })
        }
    }

    return (
        <div className="publish">
            <Nav />
            <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                <div className="publish-page">
                    <h2>New Episode</h2>
                    <form>
                        <div className="divider" />

                        <div className="series flex-between row wrap w-90 pa">
                            <div className="series-select flex row wrap pa-h">
                                <h2>Select Series</h2>
                                <wired-combo selected={series} ref={seriesSelected}>
                                    <wired-item value="new">New Series</wired-item>
                                    <SeriesCombo />
                                </wired-combo>
                            </div>
                            <div className="type-select flex row pa-h">
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
                            </div>
                        </div>

                        <div className="divider" />

                        <div className="w-90 pa">
                            <div className={type === "novel" &&  series !== "new" ? "hidden" : "flex-start row pa-h"}>
                                {
                                    series === "new" ?
                                    <h2>Series Thumbnail</h2>
                                    :
                                    <h2>Images</h2>
                                
                                }
                                <p>(Maximum file size of 2MB)</p>
                            </div>

                            <div className={type === "novel" &&  series !== "new" ? "hidden" : "flex-start row pa-h"}>
                                <p>
                                    Please note that Inkito uses
                                        <b> IPFS </b>
                                        public nodes for image uploads. More info in our
                                        <a
                                        href="https://wallet.hive.blog/tos.html"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <b> terms of services</b>
                                    </a>.
                                    </p>
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

                            <div className={type === "novel" &&  series !== "new" ? "hidden" : "flex col"}>
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

                            <div className={type === "novel" &&  series !== "new" ? "hidden" : "upload flex-start wrap row pa-h"}>
                                <input className="custom-file-input" type="file" placeholder="Upload an image" onChange={(e) => setImageFile(e.target.files[0])} />
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
                                        >
                                            Markdown Styling guide
                                        </a>
                                    </label>
                                    <wired-textarea
                                        rows="10"
                                        type="text"
                                        value=""
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
                                        >
                                            Markdown Styling guide
                                        </a>
                                    </label>
                                    <wired-textarea
                                        rows="40"
                                        type="text"
                                        value=""
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
                                                if (categories.includes(category)){
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

                        <div className="end flex row">
                            <div className="rules reset pa-h">
                                <h3>
                                    Please follow the rules
                                </h3>
                                <p>
                                    By submitting your comics or novels you agree to Inkito's Terms of Service and Content Policies. Please do not violate the copyright or privacy of others.
                                </p>

                            </div>
                            <button className="publish-btn" onClick={handleSubmit}> Publish</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
}

export default PublishPage;

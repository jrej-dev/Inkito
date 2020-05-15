import React, { useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import Nav from '../Main/Nav';
import '../../sass/components/Publish.scss';

const PublishPage = () => {
    const store = React.useContext(StoreContext);
    var props = {};

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getUrlParams();
        return () => store.toggleNavMenu(false);
    })

    const getUrlParams = () => {
        props.series_id = new URLSearchParams(document.location.search).get('new');
        props.permlink = new URLSearchParams(document.location.search).get('edit');
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
                                <wired-combo selected="new">
                                    <wired-item value="new">New Series</wired-item>
                                </wired-combo>
                            </div>
                            <div className="type-select flex row pa-h">
                                <wired-radio-group selected="comic">
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
                            <div className="flex-start row pa-h">
                                <h2>Images</h2>
                                <p>(Maximum file size of 2MB)</p>
                            </div>

                            <div className="flex-start row pa-h">
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

                            <div className="flex col">
                                <table border="1">
                                    <tbody>
                                        <tr>
                                            -
                                        </tr>
                                        <tr>
                                            -
                                        </tr>
                                        <tr>
                                            -
                                        </tr>
                                        <tr>
                                            -
                                        </tr>
                                        <tr>
                                            -
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="upload flex-start wrap row pa-h">
                                    <input className="custom-file-input" type="file" placeholder="Upload an image" />
                                    <div className="buttons flex-between">
                                        <p className="blue" >Upload file</p>
                                        <p className="blue" >Upload from link</p>
                                    </div>
                            </div>

                            <div className="input name pa-h">
                                <label><h2>Episode Title</h2></label>
                                <wired-input
                                    type="text"
                                    value=""
                                //ref={nameInput}
                                />
                            </div>

                            <div className="input description pa-h">
                                <label><h2>Description</h2></label>
                                <wired-textarea
                                    rows="10"
                                    type="text"
                                    value=""
                                //ref={aboutInput}
                                />
                            </div>

                            <div className="input tags pa-h">
                                <label className="flex row"><h2>Tags</h2> <div className="pa-h"><p>(3 Tags max)</p></div></label>
                                <wired-input
                                    type="text"
                                    value=""
                                //ref={nameInput}
                                />
                            </div>
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
                            <button className="publish-btn"> Publish</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
}

export default PublishPage;

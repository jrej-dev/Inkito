import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
//import { useObserver } from 'mobx-react';
//import { toJS } from 'mobx';

import Nav from '../Main/Nav';
import '../../sass/components/Publish.scss';

const SeriesEdit = () => {
    const store = React.useContext(StoreContext);
    var props = {};

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getUrlVars();
        return () => store.toggleNavMenu(false);
    })

    const getUrlVars = () => {
        var address = window.location.href;

        var indexOfSeries = address.indexOf("series");
        address = address.slice(indexOfSeries + 7, address.length);

        var params = address.split("/");
        props.author = params[0];
        props.permlink = params[1];

        store.fetchSeriesDetail(props.author, props.permlink, 0);
        return props;
    }

    return (
        <div className="publish">
            <Nav />
            <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                <div className="publish-page">
                    <h2>Series</h2>
                </div>
            </div>
        </div >
    );
}

export default SeriesEdit;
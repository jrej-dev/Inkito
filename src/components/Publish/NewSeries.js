import React, { useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import Nav from '../Main/Nav';
import '../../sass/components/Publish.scss';

const NewSeries = () => {
    const store = React.useContext(StoreContext);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        return () => store.toggleNavMenu(false);
    })

    return (
        <div className="publish">
            <Nav />
            <div className="container reset" onClick={() => store.toggleNavMenu(false)}>
                <div className="publish-page">
                    <h1>New series</h1>
                </div>
            </div>
        </div >
    );
}

export default NewSeries;

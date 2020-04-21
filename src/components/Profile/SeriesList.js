import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import 'wired-elements';
import '../../sass/components/Profile.scss';

const SeriesList = () => {
    const store = React.useContext(StoreContext);

    const ComicList = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo.series)) {
                let seriesList = [];
                toJS(store.authorInfo).series.forEach(series => {
                    //check if last update includes inkito
                    if (series.tags.includes("inkito-comics")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <img src={series.image} alt="" />
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">{series.title}</h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                })
                if (seriesList.length > 0) {
                    return (
                        <div>
                            <h3 className="list-title">Comics</h3>
                            <ul className="series-list pa">
                                {seriesList}
                            </ul>
                        </div>
                    )
                } else { return "" }
            } else {
                return ""
            }
        })
    }
    
    const NovelList = () => {
        return useObserver(() => {
            if (toJS(store.authorInfo.series)) {
                let seriesList = [];
                toJS(store.authorInfo).series.forEach(series => {
                    //check if last update includes inkito
                    if (series.tags.includes("inkito-novels")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <img src={series.image} alt="" />
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">{series.title}</h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                })
                if (seriesList.length > 0) {
                    return (
                        <div>
                            <h3 className="list-title">Novels</h3>
                            <ul className="series-list pa">
                                {seriesList}
                            </ul>
                        </div>
                    )
                } else { return "" }
            } else {
                return ""
            }
        })
    }

    return useObserver(() => {
        if (toJS(store.authorInfo.series)) {
            if (toJS(store.authorInfo.series).length > 0) {
                return (
                    <div className="series">
                        <h2>Series</h2>
                        <ComicList />
                        <NovelList />
                        {/*if more
                        <li className="add-series">
                            <img className="lg-icon" src={Add} alt="add-icon"/>
                        </li>*/}
                    </div>
                )
            } else { return "" }
        } else {
            return ""
        }
    })
}

export default SeriesList;
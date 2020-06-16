import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from "react-router-dom";
import Edit from '../Icons/edit.png';
import '../../sass/components/Profile.scss';

const SeriesList = () => {
    const store = React.useContext(StoreContext);

    const ComicList = ({ author, user, seriesArray }) => {
        if (seriesArray && seriesArray.length > 0 && !seriesArray.includes(undefined)) {
            let seriesList = [];
            seriesArray.forEach(series => {
                if (series) {
                    let lastTags = JSON.parse(series.last_update.json_metadata);
                    let seriesUrl = series.seriesId.replace("-", "/");
                    if (series.tags.includes("inkitocomics") || lastTags.tags.includes("inkitocomics") || series.tags.includes("inkito-comics") || lastTags.tags.includes("inkito-comics")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <div className={user === author ? "series-admin" : "hidden"}>
                                        <Link to={{
                                            pathname: `/publish?user=${user}`,
                                            state: {
                                                type: "comic",
                                                seriesInfo: series,
                                                series: series.title,
                                                dashboard: true,
                                            }
                                        }}>
                                            <button className="white">
                                                <img src={Edit} className="sm-icon icon" alt="Edit" />
                                            </button>
                                        </Link>
                                        <Link to={{
                                            pathname: `/publish?user=${user}`,
                                            state: {
                                                type: "comic",
                                                series: series.title
                                            }
                                        }}>
                                            <button className="add-ep-btn white">
                                                +
                                            </button>
                                        </Link>

                                    </div>
                                    <Link to={`/comicReader/${seriesUrl}`}>
                                        <img className="thumbnail" src={series.image} alt="comic-thumbnail" />
                                    </Link>
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">
                                        <Link to={`/comicReader/${seriesUrl}`}>
                                            {series.title}
                                        </Link>
                                    </h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                }
            })
            if (seriesList.length > 0) {
                return (
                    <div>
                        <h3 className="list-title">Comics</h3>
                        <ul className="series-list pa">
                            {seriesList}
                            <li className={user === author ? "add-series flex-start" : "hidden"}>
                                <Link to={`/publish?user=${user}`}>
                                    <button className="add-sr-btn white">+</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            } else { return "" }
        } else {
            return <wired-spinner className="flex" class="custom" spinning duration="3000" />
        }
    }

    const NovelList = ({ author, user, seriesArray }) => {
        if (seriesArray && seriesArray.length > 0 && !seriesArray.includes(undefined)) {
            let seriesList = [];
            seriesArray.forEach(series => {
                if (series) {
                    let lastTags = JSON.parse(series.last_update.json_metadata);
                    let seriesUrl = series.seriesId.replace("-", "/");
                    if (series.tags.includes("inkito-novels") || lastTags.tags.includes("inkito-novels")) {
                        seriesList.push(
                            <li key={series.seriesId}>
                                <div className="series-thumbnail">
                                    <div className={user === author ? "series-admin" : "hidden"}>
                                        <Link to={{
                                            pathname: `/publish?user=${user}`,
                                            state: {
                                                type: "novel",
                                                seriesInfo: series,
                                                series: series.title,
                                                dashboard: true
                                            }
                                        }}>
                                            <button className="white">
                                                <img src={Edit} className="sm-icon icon" alt="Edit" />
                                            </button>
                                        </Link>
                                        <Link to={{
                                            pathname: `/publish?user=${user}`,
                                            state: {
                                                type: "novel",
                                                series: series.title
                                            }
                                        }}>
                                            <button className="add-ep-btn white">
                                                +
                                            </button>
                                        </Link>
                                    </div>
                                    <Link to={`/novelReader/${seriesUrl}`}>
                                        <img className="thumbnail" src={series.image} alt="novel-thumbnail" />
                                    </Link>
                                </div>
                                <div className="series-info flex reset">
                                    <h3 className="series-title">
                                        <Link to={`/novelReader/${seriesUrl}`}>
                                            {series.title}
                                        </Link>
                                    </h3>
                                    <p>Updated: {series.last_update.created.slice(0, 10)}</p>
                                </div>
                            </li>
                        )
                    }
                }
            })

            if (seriesList.length > 0) {
                return (
                    <div>
                        <h3 className="list-title">Novels</h3>
                        <ul className="series-list pa">
                            {seriesList}
                            <li className={user === author ? "add-series flex-start" : "hidden"}>
                                <Link to={{
                                    pathname: `/publish?user=${user}`,
                                    state: {
                                        type: "novel"
                                    }
                                }}>
                                    <button className="add-sr-btn white">+</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            } else { return "" }
        } else {
            return <wired-spinner className="flex" class="custom" spinning duration="3000" />

        }
    }

    return useObserver(() => {
        if (toJS(store.authorInfo)) {
            if (toJS(store.authorInfo).series && toJS(store.authorInfo).series.length > 0) {
                const author = toJS(store.authorInfo);
                const user = toJS(store.userDetail).name || "";
                return (
                    <div className="series">
                        <h2>Series</h2>
                        <ComicList author={author.name} user={user} seriesArray={author.series} />
                        <NovelList author={author.name} user={user} seriesArray={author.series} />
                    </div>
                )
            } else { return "" }
        } else {
            return ""
        }
    })
}

export default SeriesList;
import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from "react-router-dom";
import Edit from '../Icons/edit.png';
import '../../sass/components/Profile.scss';

const Library = () => {
    const store = React.useContext(StoreContext);   
    
    return useObserver(() => {
        if (toJS(store.authorInfo)) {
            if (toJS(store.authorInfo).series && toJS(store.authorInfo).series.length > 0) {
                const author = toJS(store.authorInfo);
                const user = toJS(store.userDetail).name || "";
                const following = author.following;
                return (
                    <div className="series">
                        <h2>Library</h2>
                        {/*<ComicList author={author.name} user={user} seriesArray={author.series} />*/}
                        {/*<NovelList author={author.name} user={user} seriesArray={author.series} />*/}
                    </div>
                )
            } else { return "" }
        } else {
            return ""
        }
    })
}

export default Library;
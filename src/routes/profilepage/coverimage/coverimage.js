import React from 'react';
import StoreContext from '../../../stores/appStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

const CoverImage = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => {
        if (toJS(store.authorInfo)) {
            const author = toJS(store.authorInfo);
            return (
                <div className="cover-image reset flex">
                    {author.cover ? <img src={author.cover} alt="cover" /> : ""}
                </div>
            )
        } else {
            return <wired-spinner class="custom" spinning duration="1000" />
        }
    })
}

export default CoverImage;
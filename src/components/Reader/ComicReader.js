import React from 'react';
import '../../sass/components/Reader.scss';
import StoreContext from '../../stores/AppStore';

import NavReader from './NavReader';

const ComicReader = () => {

  return (
    <div className="comic-reader">
        <NavReader />
            <div className="image">
              <img src="https://picsum.photos/400/400" alt="random image"/>
            </div>
    </div>
  );
}


export default ComicReader;

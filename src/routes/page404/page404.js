import React from 'react';

import Hero from '../../components/hero/hero';
import ImageError from '../../assets/images/2663506.jpg';

const Page404 = () => {

  return (
    <div>
      <Hero />
        <div className="not-found flex col">
          <img src={ImageError} alt="content not found"/>
          <h2 className="flex"> Oops... We couldn't find that.</h2>
          <h3 className="flex"> Please try another address.</h3>
        </div>
    </div>
  );
}


export default Page404;

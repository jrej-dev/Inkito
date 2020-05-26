import React from 'react';

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';
import ImageError from '../Images/2663506.jpg';

const Page404 = () => {

  return (
    <div>
      <Nav />
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

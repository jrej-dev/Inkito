import React from 'react';
import ComicImage from '../../assets/images/reading-man.png';
import './hero.scss';

function ComicHero() {
  return (
    <div className="fullHero">
      <img src={ComicImage} alt="reading-man"/>
      <h2>Comics</h2> 
    </div>
  );
}

export default ComicHero;
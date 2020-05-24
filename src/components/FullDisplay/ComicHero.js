import React from 'react';
import '../../sass/components/Hero.scss';
import ComicImage from '../Images/reading-man.png';

function ComicHero() {
  return (
    <div className="fullHero">
      <img src={ComicImage} alt="reading-man"/>
      <h2>Comics</h2> 
    </div>
  );
}

export default ComicHero;
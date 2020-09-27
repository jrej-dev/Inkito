import React from 'react';
import NovelImage from '../../assets/images/reading-woman.png';
import './hero.scss';

function NovelHero() {
  return (
    <div className="fullHero">
      <img src={NovelImage} alt="reading-woman"/>
      <h2>Novels</h2> 
    </div>
  );
}

export default NovelHero;
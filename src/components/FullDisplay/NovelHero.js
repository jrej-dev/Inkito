import React from 'react';
import '../../sass/components/Hero.scss';
import NovelImage from '../Images/reading-woman.png';

function NovelHero() {
  return (
    <div className="fullHero">
      <img src={NovelImage} alt="reading-woman"/>
      <h2>Novels</h2> 
    </div>
  );
}

export default NovelHero;
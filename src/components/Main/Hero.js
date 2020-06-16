import React from 'react';
import '../../sass/components/Hero.scss';
import Logo from '../Images/logo.png';

function Hero() {
  return (
    <div className="hero">
      <img src={Logo} className="circle" alt="logo" />
      <p>Your story is worth something.</p> 
    </div>
  );
}

export default Hero;
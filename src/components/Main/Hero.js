import React from 'react';
import '../../sass/components/Hero.scss';
import Logo from '../Images/logo.png';

function Hero() {
  return (
    <div className="hero">
      <img src={Logo} className="circle" alt="logo" />
      <p><strong>Your story is worth something.</strong></p> 
    </div>
  );
}

export default Hero;
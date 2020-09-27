import React from 'react';
import './hero.scss';
import Logo from '../../assets/images/logo.png';

function Hero() {
  return (
    <div className="hero">
      <img src={Logo} className="circle" alt="logo" />
      <p>Your story is worth something.</p> 
    </div>
  );
}

export default Hero;
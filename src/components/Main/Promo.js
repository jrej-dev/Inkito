import React from 'react';
import '../../sass/components/Promo.scss';
import { WiredButton } from "wired-elements";
import InfoIcon from '../../Icons/info-icon.svg';

const Promo = ({ promoArray }) => {
  return (
    <div className="promo">
        <div className="heroCover" />
        <ul className="promoBanner">
            <li className="promoBox promo1">
                {promoArray[0] ? <a href={promoArray[0].link}><img src={promoArray[0].thumbnail} alt={`thumbnail ${promoArray[0].title}`}></img></a> : null}
            </li>
            <li className="promoBox promo2">
                {promoArray[1] ? <a href={promoArray[1].link}><img src={promoArray[1].thumbnail} alt={`thumbnail ${promoArray[0].title}`}></img></a> : null}   
            </li>
            <li className="promoBox promo3">
                {promoArray[2] ? <a href={promoArray[2].link}><img src={promoArray[2].thumbnail} alt={`thumbnail ${promoArray[0].title}`}></img></a> : null} 
            </li>
            <li className="promoBox promo4">
                {promoArray[3] ? <a href={promoArray[3].link}><img src={promoArray[3].thumbnail} alt={`thumbnail ${promoArray[0].title}`}></img></a> : null} 
            </li>
            <li className="promoBox promo5">
                {promoArray[4] ? <a href={promoArray[4].link}><img src={promoArray[4].thumbnail} alt={`thumbnail ${promoArray[0].title}`}></img></a> : null} 
            </li>
            <li className="promoBox promoLink">
                <h2>Promoted</h2>
                <p>Get your story up here.</p>
                <a href="/">Click to learn more...</a>
                <div className="info">
                    <wired-icon-button>
                        <img className="info-icon" src={InfoIcon} alt="info"/>
                    </wired-icon-button>
                </div>
            </li>
        </ul>
    </div>
  );
}

export default Promo;
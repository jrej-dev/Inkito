import React from 'react';
import StoreContext from '../../stores/appstore';
import { useObserver } from 'mobx-react';
import { useAlert } from 'react-alert';

import './promo.scss';

const Promo = () => {
    const store = React.useContext(StoreContext);
    const alert = useAlert();

    const PromoBoxes = () => {
        return useObserver(() => {
            var promoList = [];
            var length = store.promoArray.length;
            for (let i = 0; i < 6; i++) {
                if (i < length) {
                    promoList.push(
                        <li className={`promoBox promo${i + 1}`}
                            key={store.promoArray[i].title}>
                            <a href={store.promoArray[i].link} title="promoted content thumbnail">
                                <img
                                    src={store.promoArray[i].thumbnail}
                                    alt={`Thumbnail ${store.promoArray[i].title}`}
                                />
                            </a>
                        </li>
                    )
                } else {
                    promoList.push(
                        <li
                            className={`promoBox promo${i + 1} empty`}
                            key={`promo${i + 1}`}>
                        </li>
                    )
                }
            }
            return promoList;
        })
    }

    return (
        <div className="promo">
            <div className="heroCover" />
            <ul className="promoBanner">
                <PromoBoxes />
                <li className="promoBox promoLink flex" onClick={() => {
                    alert.show('Not available yet.', {
                        timeout: 2000, // custom timeout just for this one alert
                    })
                }}>
                    <h2 className="promoted pointer">Promoted</h2>
                    <p className="here pointer">Get your story up here.</p>
                </li>
            </ul>
        </div>
    );
}

export default Promo;
import React from 'react';
import './Half.css';

import Shopper from '../assets/img/welcome_body/shopper.jpg';
import Seller from '../assets/img/welcome_body/seller.jpg';
function Half({ content }) {
    let img;
    let title;
    if (content) {
        title = "Buy Stuff";
        img = Shopper;
    }
    else {
        title = "Sell Stuff";
        img = Seller;
    }

    return <div className='bgImage' style={{ backgroundImage: `url(${img})` }}>
        <div className='overlay'>
            <div className='Title'><button className='btn bg-light button_title'>{title}</button></div>
        </div>
    </div>;
}

export default Half;

import React from 'react';

import poloLogo from '../../assets/images/polo_icon.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={poloLogo} alt="Polo pic" />
    </div>
);

export default logo;